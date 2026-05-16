export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

const AboutPage = () => {
  return (
    <main className='max-w-5xl mx-auto px-6 py-8'>
      <div>About Page</div>
    </main>
  );
};

export default AboutPage;
