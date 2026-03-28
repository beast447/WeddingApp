import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Confetti from "react-confetti";

interface Values {
  name: string;
  address: string;
}

export default function AddressForm() {
  const { register, handleSubmit, setValue } = useForm<Values>();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  const onSubmit: SubmitHandler<Values> = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "addresses"), {
        name: data.name,
        address: data.address,
      });
      setSubmitted(true);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.log(err);
    }
  };

  if (submitted === false) {
    return (
      <>
        <div className="m-25">
          <h1 className="text-center text-4xl">
            Please Enter Your Full Name and Address for a Formal Invitation
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-sage-700 mb-2 mt-10"
            >
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              autoComplete="name"
              onChange={(e) => setValue("name", e.target.value, { shouldValidate: true })}
              className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
              placeholder="John Wick"
            />
            <label
              htmlFor="address"
              className="block text-lg font-medium text-sage-700 mb-2 mt-10"
            >
              Full Mailing Address
            </label>
            <textarea
              {...register("address", { required: true })}
              id="address"
              autoComplete="street-address"
              onChange={(e) => setValue("address", e.target.value, { shouldValidate: true })}
              rows={2}
              className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all resize-none"
              placeholder="123 Address Lane, Blacksburg, VA, 24060"
            />
            <div className="flex flex-col items-center">
              <button
                className="mt-10 text-2xl p-3 text-white border border-transparent shadow-xl/25 rounded-md bg-sage-700 text-center cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Confetti frameRate={60} />
        <div className="m-25 flex flex-col items-center gap-2 justify-center ">
          <h1 className="text-center text-4xl">Thank you!</h1>
          <h2>We cant wait to see you!</h2>
        </div>
      </>
    );
  }
}
