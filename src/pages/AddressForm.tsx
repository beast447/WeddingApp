import { useFormik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Confetti from "react-confetti";

interface Values {
  name: string;
  address: string;
}

let isSubmitted = false;

export default function AddressForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(100, "Too many Characters").required("Required"),
      address: Yup.string()
        .max(200, "Too many Characters")
        .required("Required"),
    }),
    onSubmit: async (values: Values) => {
      try {
        const docRef = await addDoc(collection(db, "addresses"), {
          name: values.name,
          address: values.address,
        });
        formik.values.name = "";
        formik.values.address = "";
        isSubmitted = true;
        console.log("Document written with ID: ", docRef.id);
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isSubmitted === false) {
    return (
      <>
        <div className="m-25">
          <h1 className="text-center text-4xl">
            Please Enter Your Full Name and Address for a Formal Invitation
          </h1>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-sage-700 mb-2 mt-10"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
              className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
              placeholder="John Wick"
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
            <label
              htmlFor="address"
              className="block text-lg font-medium text-sage-700 mb-2 mt-10"
            >
              Full Mailing Address
            </label>
            <input
              type="text"
              id="address"
              {...formik.getFieldProps("address")}
              className="w-full px-4 py-3 bg-cream-50 border border-sage-200 rounded-lg text-sage-800 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
              placeholder="123 Address Lane, Blacksburg, VA, 24060"
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
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
