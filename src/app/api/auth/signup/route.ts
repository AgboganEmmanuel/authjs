// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/utils/password';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);
  
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: hashedPassword,
      },
    });
    return NextResponse.json({ message: 'User created successfully!' }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Cet email existe déjà' }, { status: 400 });
    }
    
    console.log('Erreur détaillée:', error);
    
    return NextResponse.json({ 
      error: error.message || 'Une erreur est survenue lors de la création du compte' 
    }, { status: 500 });
  }
}
