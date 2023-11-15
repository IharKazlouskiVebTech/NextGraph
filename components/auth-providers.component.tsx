"use client";

import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProvidersComponent = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async (): Promise<void> => {
      const res = await getProviders();

      setProviders(res);
    };

    void fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider) => (
          <button onClick={() => signIn(provider.id)} key={provider.id}>
            Sign in
          </button>
        ))}
      </div>
    );
  }

  return <div>auth</div>;
};

export default AuthProvidersComponent;
