import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return [
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
  }

  findOne(id: number) {
    return {
      id: 1,
      short_name: 'JMBC',
      details: 'detail1234',
      owners: 'so and so',
    };
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return updateTeamDto;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

  partialUpdate(id: number, updateTeamDto: UpdateTeamDto) {
    return updateTeamDto;
  }
}
