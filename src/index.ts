import { Application, Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

const app = new Application();
const router = new Router();

router
  .get('/', (context) => {
    context.response.body = 'Hello World!';
  })
  .get('/pokemon', async (context) => {
    const allPokemon = await Deno.readFile('../data/pokemon.json');
    context.response.body = allPokemon[0];
  });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
