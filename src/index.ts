import { Application, Router, send } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { Pokemon } from './models/pokemon.model.ts';

const app = new Application();
const router = new Router();

const allPokemon: Pokemon[] = JSON.parse(await Deno.readTextFile('data/pokemon.json'));

router
    .get('/', async (context) => {
        console.log('Inside root');
        try {
            await send(context, context.request.url.pathname, {
                root: `${Deno.cwd()}/src/views`,
                index: 'index.html',
            });
        } catch (error) {
            console.error('Error occured while getting index.html', error);
            context.response.body = {
                message: 'Sorry could not get index.html',
                error,
            };
        }

        // context.response.body = 'Hello Deno!';
    })
    .get('/pokemon', (context) => {
        console.log('Inside /pokemon');
        context.response.body = allPokemon.map((p) => ({
            id: p.id,
            name: p.name.english,
            type: p.type.join('/'),
        }));
    })
    .get('/pokemon/:id', (context) => {
        console.log('Inside /pokemon/:id');
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
