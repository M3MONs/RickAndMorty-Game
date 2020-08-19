export default class API {
      async getData(id){
            const charDescription = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const description = await charDescription.json();
            return description;
      }
}
