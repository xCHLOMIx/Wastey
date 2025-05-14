"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react";
import * as tmImage from '@teachablemachine/image';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation'; // ✅ import useRouter
import { redirect } from 'next/navigation';
import { FaCircleCheck } from 'react-icons/fa6';
import Image from 'next/image';
import { div } from '@tensorflow/tfjs';

const EarnPage = () => {
  const { data: session, status } = useSession();
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<any>(null);
  const [label, setLabel] = useState('Loading...');
  const [isRecyclable, setIsRecyclable] = useState<boolean | null>(null);
  const [awarded, setAwarded] = useState(false);
  const router = useRouter();
  const [points, setPoints] = useState(session?.user?.points);

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

          if (points) {
            setPoints(points + 10);
          }

          const data = await res.json();
          console.log("Points awarded:", data);
          setAwarded(true);
          setTimeout(() => setAwarded(false), 8000);
        } catch (err) {
          console.error("Failed to award points", err);
        }
      }
    }
  };

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push('/');
  //   }
  // }, [status, router]);

  return (
    <div className="h-full">
      <div className="flex justify-center h-full items-center">
        <div className='flex flex-col items-center gap-5'>
          <div className='flex'>
            {
              !awarded &&
              <div className='flex flex-col gap-5 text-center'>
                <h1 className="text-3xl text-white font-semibold">
                  Scan to earn 👌
                </h1>
                <div className="max-w-md w-full max-sm:rounded-2xl rounded-l-2xl bg-altstroke overflow-hidden text-center h-md relative">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    height="100%"
                    videoConstraints={{ facingMode: 'environment' }}
                  />
                  <div className={`${isRecyclable ? "bg-green-400" : "bg-red-400"} absolute bottom-3 p-2 text-white font-semibold rounded-xl left-3 px-3 w-max`}>
                    {isRecyclable === true ? <h3>Recyclable</h3> : <h3>Not Recyclable</h3>}
                  </div>
                </div>
              </div>
            }
            {
              awarded &&
              <div className='max-w-md w-full max-sm:rounded-2xl max-sm:px-20 h-md p-10 bg-altbg flex flex-col items-center px-30 gap-5 py-16 rounded-l-2xl'>
                <FaCircleCheck size={150} className='text-green-400' />
                <div className='text-white text-center'>
                  <p>Points awarded 😉</p>
                  <p>Thanks 😊</p>
                </div>
              </div>
            }
          </div>
        </div>
        <div className='max-md:hidden border-2 p-4 rounded-3xl flex flex-col gap-5 border-altstroke pt-6'>
          <div className='flex flex-col gap-3 px-4 items-center'>
            <span className='text-white/50 font-bold text-xl text-center'>Here are your current <br /> points</span>
            <span className='text-3xl font-bold text-white'>
              {session?.user.points}
            </span>
            <div>
              <Image src="/coins.png" alt='points' width={240} height={240} />
            </div>
          </div>
          <button className='bg-blue-500 w-full p-3 font-bold text-white cursor-pointer rounded-xl' onClick={()=>router.push('/redeem')} >Redeem</button>
        </div>
      </div>
    </div>
  );
};

export default EarnPage;
