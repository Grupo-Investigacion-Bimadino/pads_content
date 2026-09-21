export type UserRole = 'admin' | 'docente' | 'alumno' | 'invitado';

export interface User {
  id: string;
  nickname: string;
  name: string;
  role: UserRole;
  email: string;
  picture: string;
  department?: string;
}

export type ContentType = 'presentacion' | 'video' | 'documento' | 'imagen';
export type ContentFormat = 'mp4' | 'pdf' | 'png' | 'jpg' | 'pptx' | 'webp';

export interface ContentVersion {
  id: string;
  versionNumber: number;
  title: string;
  description: string;
  type: ContentType;
  format: ContentFormat;
  size: string;
  fileUrl: string;
  modifiedAt: string;
  modifiedBy: string;
  changeNotes: string;
}

export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  bulletPoints?: string[];
  imageUrl?: string;
  codeSnippet?: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  format: ContentFormat;
  title: string;
  description: string;
  size: string;
  editionType: string;
  isPrivate: boolean;
  allowedRoles: UserRole[];
  fileUrl: string;
  thumbnailUrl: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  viewsCount: number;
  downloadsCount: number;
  teamId?: string;
  teamName?: string;
  slides?: Slide[];
  versions: ContentVersion[];
}

export interface CommentItem {
  id: string;
  contentId: string;
  userId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  comment: string;
  createdAt: string;
  moderated: boolean;
}

export interface TeamItem {
  id: string;
  name: string;
  shortName: string;
  detail: string;
  owner: string;
  ownerEmail: string;
  membersCount: number;
  contentsCount: number;
}
