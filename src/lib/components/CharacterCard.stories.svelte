<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CharacterCard from './CharacterCard.svelte';
  import type { Character } from '../../types/character';

  const { Story } = defineMeta({
    title: 'Components/CharacterCard',
    component: CharacterCard,
    tags: ['autodocs'],
    parameters: {
      layout: 'centered',
    },
  });

  const harryPotter: Character = {
    fullName: 'Harry James Potter',
    nickname: 'Harry',
    hogwartsHouse: 'Gryffindor',
    interpretedBy: 'Daniel Radcliffe',
    children: [
      'James Sirius Potter',
      'Albus Severus Potter',
      'Lily Luna Potter',
    ],
    image:
      'https://potterapi-fedeperin.vercel.app/images/characters/harry_potter.png',
    birthdate: '31-07-1980',
    index: 0,
  };

  const dracoMalfoy: Character = {
    fullName: 'Draco Lucius Malfoy',
    nickname: 'Draco',
    hogwartsHouse: 'Slytherin',
    interpretedBy: 'Tom Felton',
    children: ['Scorpius Hyperion Malfoy'],
    image:
      'https://potterapi-fedeperin.vercel.app/images/characters/draco_malfoy.png',
    birthdate: '05-06-1980',
    index: 2,
  };

  const lunaLovegood: Character = {
    fullName: 'Luna Lovegood',
    nickname: 'Loony',
    hogwartsHouse: 'Ravenclaw',
    interpretedBy: 'Evanna Lynch',
    children: ['Lorcan Scamander', 'Lysander Scamander'],
    image:
      'https://potterapi-fedeperin.vercel.app/images/characters/luna_lovegood.png',
    birthdate: '13-02-1981',
    index: 3,
  };

  const cedricDiggory: Character = {
    fullName: 'Cedric Diggory',
    nickname: 'Ced',
    hogwartsHouse: 'Hufflepuff',
    interpretedBy: 'Robert Pattinson',
    children: [],
    image:
      'https://potterapi-fedeperin.vercel.app/images/characters/cedric_diggory.png',
    birthdate: '01-10-1977',
    index: 4,
  };
  const unknownCharacter: Character = {
    fullName: 'Unknown Wizard',
    nickname: '',
    hogwartsHouse: '',
    interpretedBy: '',
    children: [],
    image: 'https://via.placeholder.com/400x500/111111/ecb939?text=Unknown',
    birthdate: '',
    index: 5,
  };
</script>

<Story name="Gryffindor" args={{ character: harryPotter }} />

<Story name="Slytherin" args={{ character: dracoMalfoy }} />

<Story name="Ravenclaw" args={{ character: lunaLovegood }} />

<Story name="Hufflepuff" args={{ character: cedricDiggory }} />

<div style="width: 260px;">
  <Story name="Unknown" args={{ character: unknownCharacter }} />
</div>
