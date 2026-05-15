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
    typeof data === 'object' &&
    data !== null &&
    // controllo su tutte le proprietà
    'id' in data && typeof data.id === 'number' &&
    'name' in data && typeof data.name === 'string' &&
    'birth_year' in data && typeof data.birth_year === 'number' &&
    'death_year' in data && typeof data.death_year === 'number' &&
    'biography' in data && typeof data.biography === 'string' &&
    'image' in data && typeof data.image === 'string' &&
    // controllo tuple, se è un array se la sua lunghezza è di 3 elementi e se tutti sono dei tipi stringa 
    'most_famous_movies' in data &&
    data.most_famous_movies instanceof Array &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(movie => typeof movie === 'string') &&
    'awards' in data && typeof data.awards === 'string' &&
    'nationality' in data && typeof data.nationality === 'string'
  )
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const res: Response = await fetch(`http://localhost:3333/actresses/${id}`)
    const dati: unknown = await res.json()
    // controllo dei dati, solo dopo il Return, Dati sarà associato ad Actress
    if (!isActress(dati)) {
      throw new Error('errore nei dati')
    }
    return dati
  } catch (error) {
    // controllo error con instanceof se no me lo da di base unknown
    if (error instanceof Error) {
      console.error('errore nel caricamento delle attrici');
    } else {
      console.error('errore non identificato');
    }
    return null
  }
}

async function getAllActress(): Promise<Actress[]> {
  try {
    const res: Response = await fetch(`http://localhost:3333/actresses`)
    const dati: unknown = await res.json()
    // controllo che dati sia un array
    if (!(dati instanceof Array)) { throw new Error('formato dati non valido') }
    // controllo sulle attrici se sono valide utilizzando funzione isActress che restituisce true o false
    const attriciValide: Actress[] = dati.filter(isActress)
    return attriciValide

  } catch (error) {
    // controllo error con instanceof se no me lo da di base unknown
    if (error instanceof Error) {
      console.error('errore nel caricamento delle attrici');
    } else {
      console.error('errore non identificato');
    }
    return []
  }
}

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promise = ids.map(id => getActress(id))
    return await Promise.all(promise)
  } catch (error) {
    // controllo error con instanceof se no me lo da di base unknown
    if (error instanceof Error) {
      console.error('errore nel caricamento delle attrici');
    } else {
      console.error('errore non identificato');
    }
    return []
  }
}