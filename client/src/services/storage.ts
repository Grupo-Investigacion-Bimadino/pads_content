import { ContentItem, CommentItem, TeamItem, User, ContentVersion } from '../types';
import { CURRENT_USERS, INITIAL_CONTENTS, INITIAL_COMMENTS, INITIAL_TEAMS } from '../data/seedData';

const STORAGE_KEYS = {
  CONTENTS: 'cce_educational_contents_v1',
  COMMENTS: 'cce_educational_comments_v1',
  TEAMS: 'cce_educational_teams_v1',
  ACTIVE_USER_ID: 'cce_active_user_id_v1',
  DARK_MODE: 'cce_dark_mode_v1',
};

export class StorageService {
  public static getContents(): ContentItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading contents from storage:', e);
    }
    this.saveContents(INITIAL_CONTENTS);
    return INITIAL_CONTENTS;
  }

  public static saveContents(contents: ContentItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENTS, JSON.stringify(contents));
    } catch (e) {
      console.error('Error saving contents to storage:', e);
    }
  }

  public static createContent(newItem: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'downloadsCount' | 'versions'>): ContentItem {
    const contents = this.getContents();
    const id = `cnt_${Date.now()}`;
    const now = new Date().toISOString();

    const initialVersion: ContentVersion = {
      id: `v_${Date.now()}_1`,
      versionNumber: 1,
      title: newItem.title,
      description: newItem.description,
      type: newItem.type,
      format: newItem.format,
      size: newItem.size || '5.0 MB',
      fileUrl: newItem.fileUrl,
      modifiedAt: now,
      modifiedBy: newItem.authorName,
      changeNotes: 'Versión inicial creada en el sistema.',
    };

    const created: ContentItem = {
      ...newItem,
      id,
      createdAt: now,
      updatedAt: now,
      viewsCount: 1,
      downloadsCount: 0,
      versions: [initialVersion],
    };

    contents.unshift(created);
    this.saveContents(contents);
    return created;
  }

  public static updateContent(
    id: string,
    updates: Partial<ContentItem>,
    modifierName: string,
    changeNotes?: string
  ): ContentItem | null {
    const contents = this.getContents();
    const index = contents.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const current = contents[index];
    const newVersionNumber = (current.versions?.length || 0) + 1;
    const now = new Date().toISOString();

    const newVersion: ContentVersion = {
      id: `v_${Date.now()}_${newVersionNumber}`,
      versionNumber: newVersionNumber,
      title: updates.title ?? current.title,
      description: updates.description ?? current.description,
      type: updates.type ?? current.type,
      format: updates.format ?? current.format,
      size: updates.size ?? current.size,
      fileUrl: updates.fileUrl ?? current.fileUrl,
      modifiedAt: now,
      modifiedBy: modifierName,
      changeNotes: changeNotes?.trim() || `Actualización #${newVersionNumber}`,
    };

    const updated: ContentItem = {
      ...current,
      ...updates,
      updatedAt: now,
      versions: [newVersion, ...(current.versions || [])],
    };

    contents[index] = updated;
    this.saveContents(contents);
    return updated;
  }

  public static revertContentVersion(id: string, targetVersionId: string, revertedBy: string): ContentItem | null {
    const contents = this.getContents();
    const index = contents.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const current = contents[index];
    const targetVersion = current.versions?.find((v) => v.id === targetVersionId);
    if (!targetVersion) return null;

    const newVersionNumber = (current.versions?.length || 0) + 1;
    const now = new Date().toISOString();

    const restorationVersion: ContentVersion = {
      id: `v_${Date.now()}_restored`,
      versionNumber: newVersionNumber,
      title: targetVersion.title,
      description: targetVersion.description,
      type: targetVersion.type,
      format: targetVersion.format,
      size: targetVersion.size,
      fileUrl: targetVersion.fileUrl,
      modifiedAt: now,
      modifiedBy: revertedBy,
      changeNotes: `Reversión a la Versión #${targetVersion.versionNumber}`,
    };

    const updated: ContentItem = {
      ...current,
      title: targetVersion.title,
      description: targetVersion.description,
      type: targetVersion.type,
      format: targetVersion.format,
      size: targetVersion.size,
      fileUrl: targetVersion.fileUrl,
      updatedAt: now,
      versions: [restorationVersion, ...(current.versions || [])],
    };

    contents[index] = updated;
    this.saveContents(contents);
    return updated;
  }

  public static deleteContent(id: string): boolean {
    const contents = this.getContents();
    const filtered = contents.filter((c) => c.id !== id);
    if (filtered.length === contents.length) return false;

    this.saveContents(filtered);
    const comments = this.getComments().filter((comm) => comm.contentId !== id);
    this.saveComments(comments);
    return true;
  }

  public static incrementViews(id: string): void {
    const contents = this.getContents();
    const item = contents.find((c) => c.id === id);
    if (item) {
      item.viewsCount = (item.viewsCount || 0) + 1;
      this.saveContents(contents);
    }
  }

  public static incrementDownloads(id: string): void {
    const contents = this.getContents();
    const item = contents.find((c) => c.id === id);
    if (item) {
      item.downloadsCount = (item.downloadsCount || 0) + 1;
      this.saveContents(contents);
    }
  }

  public static getComments(contentId?: string): CommentItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      let comments: CommentItem[] = stored ? JSON.parse(stored) : INITIAL_COMMENTS;
      if (!stored) {
        this.saveComments(INITIAL_COMMENTS);
      }
      if (contentId) {
        return comments.filter((c) => c.contentId === contentId);
      }
      return comments;
    } catch (e) {
      console.error('Error loading comments:', e);
      return INITIAL_COMMENTS;
    }
  }

  public static saveComments(comments: CommentItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (e) {
      console.error('Error saving comments:', e);
    }
  }

  public static addComment(
    contentId: string,
    user: User,
    text: string
  ): { success: boolean; comment?: CommentItem; error?: string } {
    const trimmed = text.trim();
    if (!trimmed) {
      return { success: false, error: 'El comentario no puede estar vacío.' };
    }
    if (trimmed.length > 250) {
      return {
        success: false,
        error: `El comentario excede el límite permitido de 250 caracteres (actual: ${trimmed.length}).`,
      };
    }

    const comments = this.getComments();
    const newComment: CommentItem = {
      id: `comm_${Date.now()}`,
      contentId,
      userId: user.id,
      authorName: user.name,
      authorRole: user.role,
      authorAvatar: user.picture,
      comment: trimmed,
      createdAt: new Date().toISOString(),
      moderated: true,
    };

    comments.unshift(newComment);
    this.saveComments(comments);
    return { success: true, comment: newComment };
  }

  public static deleteComment(commentId: string, requestingUser: User): boolean {
    const comments = this.getComments();
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return false;

    if (requestingUser.role === 'admin' || requestingUser.role === 'docente' || comment.userId === requestingUser.id) {
      const filtered = comments.filter((c) => c.id !== commentId);
      this.saveComments(filtered);
      return true;
    }
    return false;
  }

  public static getTeams(): TeamItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TEAMS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading teams:', e);
    }
    this.saveTeams(INITIAL_TEAMS);
    return INITIAL_TEAMS;
  }

  public static saveTeams(teams: TeamItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    } catch (e) {
      console.error('Error saving teams:', e);
    }
  }

  public static getActiveUser(): User {
    try {
      const storedId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID);
      const found = CURRENT_USERS.find((u) => u.id === storedId);
      if (found) return found;
    } catch (e) {
      // fallback
    }
    return CURRENT_USERS[0];
  }

  public static setActiveUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, user.id);
    } catch (e) {
      console.error('Error saving active user:', e);
    }
  }

  public static getDarkMode(): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      return stored ? JSON.parse(stored) : false;
    } catch (e) {
      return false;
    }
  }

  public static setDarkMode(isDark: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDark));
    } catch (e) {
      console.error('Error saving dark mode:', e);
    }
  }

  public static resetToFactoryDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.CONTENTS);
    localStorage.removeItem(STORAGE_KEYS.COMMENTS);
    localStorage.removeItem(STORAGE_KEYS.TEAMS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
    this.saveContents(INITIAL_CONTENTS);
    this.saveComments(INITIAL_COMMENTS);
    this.saveTeams(INITIAL_TEAMS);
  }
}
