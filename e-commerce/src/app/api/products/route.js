import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {       //wichtig
    console.log("Entwicklungsmodus");
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export async function POST(req) {
    try {
        const { name, description, price, quantities, imageUrl } = await req.json();

        const product = await prisma.product.create({
            data: { name, description, price, quantities, imageUrl },
        });

        return new Response(JSON.stringify(product), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
