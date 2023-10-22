"use client";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import "./globals.css";
import React, { useEffect } from "react";
import Head from "next/head";
import gsap from "gsap";
import styles from "../styles/Home.module.css";

/**
 * Renders the home page of the To-Do List application.
 * @returns {JSX.Element} The home page JSX element.
 */
function page() {

  useEffect(() => {

    const section = document.querySelector("section");

    gsap.set(section, { opacity: 0 });
    gsap.fromTo(
      section,
      { rotationX: -90, opacity: 0 },
      { rotationX: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    gsap.from(".text-change", {
      duration: 0.8,
      opacity: 0,
      y: -50,
      ease: "power2.out",
      delay: 0.5,
    });

    gsap.from(".google-button", {
      duration: 0.8,
      opacity: 0,
      x: -50,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  const router = useRouter();

  /**
   * Signs in the user with Google authentication.
   */
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(result);
        router.push("/frontpage");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(`${errorMessage}`);

      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>ToDo-List</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <main >
        <div className="text-white text-center py-20  bg-gray-800 h-3/4   border-gray-900">
        <h1 className="text-change text-3xl text-white text-center py-2 font-bold">Welcome to Todo List📝</h1>
        <h2 className="text-2xl text-slate-400 text-center py-8">Turn Dreams into Reality, One Task at a Time ✨</h2>
        <div className="text-white text-center mt-4">
          <svg
            className="animate-bounce w-6 h-6 mx-auto "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 14.586L3.707 8.293a1 1 0 011.414-1.414L10 11.758l4.879-4.879a1 1 0 111.414 1.414L10 14.586z"
              clipRule="evenodd"
            />
          </svg>
          <button onClick={SignInWithGoogle} type="button"  className=" google-button mx-auto flex border-4 rounded-lg items-center  ">


            <svg
              className="w-4 h-4 mr-2 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              />
            </svg>
            <span >Continue with Google</span>
          </button>
        </div>
        </div>
        
  <section className="text-white text-center py-4 px-20 bg-gray-800 w-screen ">
    <h5 className="text-2xl py-20">
      Are you ready to take control of your life and achieve your goals?{" "}
      <span role="img" aria-label="rocket">
        🚀
      </span>
    </h5>
    <p className="text-lg font-medium">
      Our to-do list is designed to be your guiding light,{" "}
      <span role="img" aria-label="star">
        🌟
      </span>{" "}
      helping you stay organized, motivated, and successful.{" "}
      <span role="img" aria-label="muscle">
        💪
      </span>
    </p>
    <p className="text-lg font-medium">
      Say goodbye to procrastination and hello to a more accomplished you!{" "}
      <span role="img" aria-label="party popper">
        🎉
      </span>
    </p>
  </section>

</main>

        <footer className=" w-screen sticky bottom-0 p-2 text-center  text-light font-semibold tracking-tighter ">
          <p className="text-gray-500">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤
            </span>{" "}
            by Gaurav Singh Jadaun
          </p></footer>

      </div>
    
  );
}

export default page;
