"use client";
import Webcam from "react-webcam";
import React, { useRef, useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";
import { signOut } from "next-auth/react";

export default function ClientPage() {
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<any>(null);
  const [label, setLabel] = useState("Loading...");
  const [isRecyclable, setIsRecyclable] = useState<boolean | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const modelURL = "/model/model.json";
      const metadataURL = "/model/metadata.json";
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
      setLabel(`${top.className} (${Math.round(top.probability * 100)}%)`);
      setIsRecyclable(top.className === "Recyclable");
    }
  };

  return (
    <div>
      {/* logout */}
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            signOut()
          }}
        >
          Logout
        </button>
        </div>
      <div className="w-[300px] rounded-2xl bg-amber-300 overflow-hidden h-max relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width="100%"
          height="100%"
          videoConstraints={{ facingMode: "environment" }}
        />
        {/* points */}
        

        <div
          className={`${
            isRecyclable ? "bg-green-400" : "bg-red-400"
          } absolute bottom-3 p-2 text-white font-semibold rounded-xl left-3 px-3 w-max`}
        >
          {isRecyclable === true ? (
            <h3>Recyclable</h3>
          ) : (
            <h3>Not Recyclable</h3>
          )}
        </div>
      </div>
    </div>
  );
}
