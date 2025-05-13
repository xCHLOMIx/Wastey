"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react";
import * as tmImage from '@teachablemachine/image';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation'; // ✅ import useRouter
import { redirect } from 'next/navigation';

const EarnPage = () => {
  const { data: session, status } = useSession();
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<any>(null);
  const [label, setLabel] = useState('Loading...');
  const [isRecyclable, setIsRecyclable] = useState<boolean | null>(null);
  const [awarded, setAwarded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = '/model/model.json';
      const metadataURL = '/model/metadata.json';
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    let interval: any;
    if (model) {
      interval = setInterval(() => detect(), 1500);
    }
    return () => clearInterval(interval);
  }, [model]);

  const detect = async () => {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video?.readyState === 4
    ) {
      const predictions = await model.predict(webcamRef.current.video);
      const top = predictions.reduce((a: any, b: any) =>
        a.probability > b.probability ? a : b
      );
      const recyclable = top.className === 'Recyclable';
      setLabel(`${top.className} (${Math.round(top.probability * 100)}%)`);
      setIsRecyclable(recyclable);

      if (recyclable && !awarded) {
        try {
          const res = await fetch('/api/points', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session?.user?.email,
              pointsToAdd: 10
            }),
          });

          const data = await res.json();
          console.log("Points awarded:", data);
          setAwarded(true);
          setTimeout(() => setAwarded(false), 10000);
        } catch (err) {
          console.error("Failed to award points", err);
        }
      }
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-10 justify-center h-full items-center">
        <h1 className="text-3xl text-white font-semibold">
          Scan to earn 👌
        </h1>
        <div className="w-xl rounded-2xl bg-amber-300 overflow-hidden h-xl relative">
          {
            !awarded &&
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              videoConstraints={{ facingMode: 'environment' }}
            />
          }
          { awarded && <p>Nice</p>}
          <div className={`${isRecyclable ? "bg-green-400" : "bg-red-400"} absolute bottom-3 p-2 text-white font-semibold rounded-xl left-3 px-3 w-max`}>
            {isRecyclable === true ? <h3>Recyclable</h3> : <h3>Not Recyclable</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnPage;
