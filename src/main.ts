type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: 'American' | 'British' | 'Australian' | 'Israeli - American' | 'South African' | 'French' | 'Indian' | 'Israeli' | 'Spanish' | 'South Korean' | 'Chinese'
}

function isActress(data: unknown): data is Actress {
  return (
    // dati deve essere vero
    data &&
    typeof data === 'object' &&
    data !== null &&
    // controllo su tutte le proprietà
    'id' in data && typeof data.id === 'number' &&
    'name' in data && typeof data.name === 'string' &&
    'birth_year' in data && typeof data.birth_year === 'number' &&
    'death_year' in data && typeof data.death_year === 'number' &&
    'biography' in data && typeof data.biography === 'string' &&
    'image' in data && typeof data.image === 'string' &&
  )
}