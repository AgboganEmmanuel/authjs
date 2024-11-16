import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' }, 
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    return NextResponse.json({ 
      exists: !!user,
      message: user ? 'Utilisateur trouvé' : 'Aucun utilisateur trouvé'
    });

  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de l\'email' }, 
      { status: 500 }
    );
  }
}