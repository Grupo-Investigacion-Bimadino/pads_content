import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  private teams: any[] = [
    {
      id: 1,
      short_name: 'JMBC',
      details: 'detail1234',
      owners: 'so and so',
    },
    {
      id: 2,
      short_name: 'LIMAV',
      details: 'Lorem ipsum dolor',
      owners: 'so and so',
    },
    {
      id: 3,
      short_name: 'TICMAC',
      details: 'Mitral core',
      owners: 'so and so',
    },
  ];

  create(createTeamDto: CreateTeamDto) {
    const newTeam = {
      id: this.teams.length + 1,
      ...createTeamDto,
    };
    this.teams.push(newTeam);
    return newTeam;
  }

  findAll() {
    return this.teams;
  }

  findOne(id: number) {
    const team = this.teams.find((t) => t.id === id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    const index = this.teams.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    this.teams[index] = { id, ...updateTeamDto };
    return this.teams[index];
  }

  remove(id: number) {
    const index = this.teams.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    const removedTeam = this.teams.splice(index, 1);
    return removedTeam[0];
  }

  partialUpdate(id: number, updateTeamDto: UpdateTeamDto) {
    const index = this.teams.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    this.teams[index] = { ...this.teams[index], ...updateTeamDto };
    return this.teams[index];
  }
}
