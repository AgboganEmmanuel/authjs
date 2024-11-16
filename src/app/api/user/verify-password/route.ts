import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { comparePassword } from '../../../../utils/password';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' }, 
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { hashedPassword: true }
    });

    if (!user?.hashedPassword) {
      return NextResponse.json({ 
        isValid: false,
        message: 'Utilisateur non trouvé'
      });
    }

    const isPasswordValid = await comparePassword(password, user.hashedPassword);

    return NextResponse.json({ 
      isValid: isPasswordValid,
      message: isPasswordValid ? 'Mot de passe correct' : 'Mot de passe incorrect'
    });

  } catch (error) {
    console.error('Erreur lors de la vérification du mot de passe:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du mot de passe' }, 
      { status: 500 }
    );
  }
}