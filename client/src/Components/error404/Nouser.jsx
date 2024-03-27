// eslint-disable-next-line no-unused-vars
import React from "react";

const Nouser = () => {
  return (
    <>
      <section className="flex items-center justify-center h-screen p-16  bg-gray-300">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600 dark:text-gray-700">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl dark:text-gray-600">
              ไม่มีหน้าที่ค้นหากรุณา เข้าสู่ระบบ
            </p>
            <a
              href="/login"
              className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200"
            >
              Back to Login
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nouser;
