import Head from "next/head";
import Image from "next/image";
import { FaCat, FaDog, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [pets, setPets] = useState("");
  const [backHome, setBackHome] = useState("");
  const [mama, setMama] = useState(0);
  const [dogtype, setDogtype] = useState("");

  const dogKgRef = useRef();
  const dogTypeRef = useRef();

  const handleSelectPet = (e) => {
    setPets(e);
    console.log(pets);
  };

  const backbutton = (e) => {
    setBackHome(e);
    setPets("");
  };

  const mamaHandler = (e) => {
    if (dogtype === "puppy") {
      setMama(e * 2 * 10);
    } else {
      setMama(e * 10);
    }
  };

  useEffect(() => {
    if (dogtype === "puppy") {
      setMama(dogKgRef.current.value * 2 * 10);
    } else if (dogtype === "adult") {
      setMama(dogKgRef.current.value * 10);
    } else {
      setMama(0);
    }
  }, [dogtype]);

  // console.log(dogKgRef.current.value);

  return (
    <div>
      <Head>
        <title>Pet Feed Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`relative customback ${
          pets == "cat" ? "bg-cat-animaton" : null
        } ${pets == "dog" ? "bg-dog-animaton" : null} ${
          pets == "" && backHome == "cat" ? "bg-catback-animaton" : null
        } ${pets == "" && backHome == "dog" ? "bg-dogback-animaton" : null}`}
      >
        {pets === "" && (
          <div className="flex flex-col space-y-10 h-screen w-full items-center justify-center ">
            <div className="space-y-4">
              <div>
                <h1 className="text-center py-2 px-6 rounded-xl text-4xl font-semibold text-white bg-gradient-to-r from-blue-400 to-lime-400">
                  Do you really feed your pet as much as it needs?
                </h1>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-center w-fit py-2 px-6 rounded-xl text-2xl font-semibold text-white bg-gradient-to-r from-blue-400 to-lime-400">
                  Select your pet first
                </p>
              </div>
            </div>
            <div className="flex space-x-8">
              <button
                onClick={() => handleSelectPet("cat")}
                className="bg-blue-400 group cursor-pointer text-white w-48 h-48 text-6xl flex flex-col items-center justify-center rounded-full"
              >
                <FaCat className="text-lime-400 group-hover:scale-150 transition-all" />
                <p className="hidden text-4xl mt-3 group-hover:inline-flex transition-all">
                  meow!!
                </p>
              </button>

              <button
                onClick={() => handleSelectPet("dog")}
                className="bg-lime-400 group text-white w-48 h-48 text-6xl flex flex-col items-center justify-center rounded-full"
              >
                <FaDog className="text-blue-400 group-hover:scale-150 transition-all" />
                <p className="hidden text-4xl mt-3 group-hover:inline-flex transition-all">
                  woof!!
                </p>
              </button>
            </div>
          </div>
        )}
        {pets === "cat" && (
          <div>
            <div>
              <button
                onClick={() => backbutton("cat")}
                className="top-4 left-4 fixed bg-blue-400 p-3 rounded-full"
              >
                <FaArrowLeft />
              </button>
            </div>
            <div className="flex flex-col space-y-10 h-screen w-full items-center justify-center ">
              deneme
            </div>
          </div>
        )}
        {pets === "dog" && (
          <div className="px-10">
            <button
              onClick={() => backbutton("cat")}
              className="top-4 left-4 fixed bg-lime-400 p-3 rounded-full"
            >
              <FaArrowLeft />
            </button>
            <div className="flex flex-col sm:flex-row sm:space-x-4  h-screen w-full items-center justify-center ">
              <div className="w-full h-96 border-8 px-5 py-4 border-lime-400 rounded-xl sm:w-1/2 lg:w-1/4 flex flex-col items-end justify-center">
                <div className="w-full">
                  <label
                    htmlFor="dogtype"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Select your dog type
                  </label>
                  <select
                    id="dogtype"
                    name="dogtype"
                    onChange={(e) => {
                      setDogtype(e.target.value);
                    }}
                    className="mt-1 block  w-full rounded-md bg-lime-400 border-gray-300 py-4 pl-3 pr-10 text-2xl focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="none"
                    ref={dogTypeRef}
                  >
                    <option value="none">Select</option>
                    <option value="puppy">Puppy</option>
                    <option value="adult">Adult</option>
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="kilogram"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Weight of your dog (kg)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="kilogram"
                      id="kilogram"
                      ref={dogKgRef}
                      onChange={(e) => mamaHandler(e.target.value)}
                      className="block w-full p-4 bg-lime-400 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="X KG"
                      defaultValue={0}
                    />
                  </div>
                  <div className="text-center  mt-4 space-y-4 text-white border-4 border-lime-400 p-5 rounded-lg">
                    <h2 className="text-2xl ">Daily food of your dog</h2>{" "}
                    <p className="text-4xl">{mama} gram</p>
                  </div>
                </div>
              </div>
              <div className="hidden lg:w-1/4 border-lime-400 lg:flex items-left justify-center">
                <FaDog className="w-full h-96 border-2 bg-lime-400 text-blue-400 border-lime-400 rounded-xl p-3" />
              </div>
            </div>
          </div>
        )}
        <div className="w-full fixed bottom-0 h-10 flex items-center justify-center  text-xl bg-black text-white">This site made by Oğuz Berk Açar for demo purposes.</div>
      </div>
    </div>
  );
}
