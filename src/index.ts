import { Application, Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { Pokemon } from './models/pokemon.model.ts';

const app = new Application();
const router = new Router();

const allPokemon: Pokemon[] = JSON.parse(await Deno.readTextFile('data/pokemon.json'));

router
    .get('/', async (context) => {
        await context.send({
            root: `${Deno.cwd()}/src/views`,
            index: 'index.html',
        });
    })
    .get('/pokemon', (context) => {
        console.log('Params for this request', context.params);
        context.response.body = allPokemon.map((p) => ({
            id: p.id,
            name: p.name.english,
            type: p.type.join('/'),
        }));
    })
    .get('/pokemon/:id', (context) => {
        const pokemon = allPokemon.find((p) => p.id.toString() == context.params.id);

        if (pokemon) {
            context.response.body = pokemon;
        } else {
            context.throw(404, 'Pokemon not found!');
        }
    });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
