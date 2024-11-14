"use client";

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertPopup } from '@/components/alerts';

export function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const handleShowAlert = (type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertType(type);
    setShowAlert(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    console.log(data);
    console.log(JSON.stringify(data));

    if (!data.name || !data.email || !data.password) {
      setError("Name, email, and password are required");
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur lors de la création du compte : ${errorText}`);
      }
      //Affichage d'un pop-up
      handleShowAlert('success')
      await new Promise(resolve => setTimeout(resolve, 5200)); // Attendre 6 secondes
      // Redirection vers la page de connexion
      router.push('/auth/login');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors durée-300"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
        />
      </div>
      {error && (
        <div className="text-red-600">
          {error}
        </div>
      )}
      <div>
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
        >
          Sign Up
        </button>
      </div>
    </form>
    <div>
    {showAlert && (
          <AlertPopup
            message={`Utilisateur créé avec succès`}
            type={alertType}
            onClose={() => setShowAlert(false)}
          />
        )}
    </div>
    </div>
    
    
  );
}
