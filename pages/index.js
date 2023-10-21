"use client";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import "./globals.css";
import React, { useEffect } from "react";
import Head from "next/head";
import gsap from "gsap";
import styles from "../styles/Home.module.css";

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

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log("cred- "+credential);
        // console.log("name -"+_tokenResponse);
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
        <link rel="icon" href="/favicon.ico"/>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <div style={{ backgroundColor: "#333" } }>
  <h1 className="text-change text-3xl text-white text-center py-4">Welcome to Todo List📝</h1>
  <h2 className="text-2xl text-dark text-center py-5">Turn Dreams into Reality, One Task at a Time ✨</h2>
  <div className="text-white text-center py-4">
    <svg
      className="animate-bounce w-6 h-8 mx-auto mb-4"
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
    <button onClick={SignInWithGoogle} type="button" className="google-button mx-auto flex border-4 rounded-lg items-center">
  <svg
    className="w-4 h-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    />
  </svg>
  <span>Continue with Google</span>
</button>
  </div>
<main>
  <section className="text-white text-center py-25 px-20 ">
    <h3 className="text-xl py-20">
      Are you ready to take control of your life and achieve your goals? 🚀
      Our to-do list project is designed to be your guiding light, 🌟
      helping you stay organized, motivated, and successful. 💪
      Say goodbye to procrastination and hello to a more accomplished you! 🎉
    </h3>
  </section>
</main>
      <footer className=" sticky bottom-0 p-2 text-center w-full text-light font-semibold tracking-tighter ">
        <p className="text-gray-500">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤
          </span>{" "}
          by Gaurav Singh Jadaun
        </p></footer>

</div>
    </div>
  );
}

export default page;
