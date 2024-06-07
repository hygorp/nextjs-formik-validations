"use client"

import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import * as  Yup from "yup";

export default function Home() {

    const fakeExistingUsernameRequest = (username: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === "jane") {
                    reject(409)
                } else {
                    resolve(200)
                }
            }, 1000)
        })
    }

    const fakeExistingEmailRequest = (email: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === "jane@mail.com") {
                    reject(409)
                } else {
                    resolve(200)
                }
            }, 1000)
        })
    }

    return (
        <main className={"h-screen flex flex-col justify-center items-center"}>
            <div className={"w-1/2 p-10 border rounded-lg"}>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        email: "",
                    }}
                    validationSchema={Yup.object({
                        username:
                            Yup.string()
                                .required("Username is required")
                                .matches(/^[a-zA-Z\s]+$/, "Only letters")
                                .test("unique-username", "Username is already in use", async (username) => {
                                    try {
                                        await fakeExistingUsernameRequest(username);
                                        return true;
                                    } catch (error) {
                                        return error !== 409;
                                    }
                                })
                        ,
                        password:
                            Yup.string()
                                .required("Password is required")
                        ,
                        email:
                            Yup.string()
                                .required("Email is required")
                                .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
                                .test("unique-email", "Email is already in use", async (email) => {
                                    try {
                                        await fakeExistingEmailRequest(email);
                                        return true;
                                    } catch (error) {
                                        return error !== 409;
                                    }
                                })
                        ,
                    })}
                    onSubmit={
                        (values: FormikValues) => console.log(values)
                    }
                >
                    {({errors, touched}) => (
                        <Form>
                            <div className={"flex flex-row gap-5"}>
                                <div className={"w-full flex flex-col gap-1"}>
                                    <label htmlFor={"username"} className={"text-sm font-medium"}>Username</label>
                                    <Field
                                        className={`
                                            p-2 border 
                                            rounded-md 
                                            ${!errors.username || !touched.username ? "" : 'border-red-400'}
                                        `}
                                        name={"username"}
                                    />
                                    <ErrorMessage
                                        className={"mt-1 text-xs text-red-500"}
                                        name={"username"}
                                        component={"div"}
                                    />
                                </div>

                                <div className={"w-full flex flex-col gap-1"}>
                                    <label htmlFor={"password"} className={"text-sm font-medium"}>Password</label>
                                    <Field
                                        className={`
                                            p-2 border 
                                            rounded-md 
                                            ${!errors.password || !touched.password ? "" : 'border-red-400'}
                                        `}
                                        name={"password"}
                                        type={"password"}
                                    />
                                    <ErrorMessage
                                        className={"mt-1 text-xs text-red-500"}
                                        name={"password"}
                                        component={"div"}
                                    />
                                </div>
                            </div>

                            <div className={"flex flex-row gap-5 mt-5"}>
                                <div className={"w-full flex flex-col gap-1"}>
                                    <label htmlFor={"email"} className={"text-sm font-medium"}>Email</label>
                                    <Field
                                        className={`
                                            p-2 border 
                                            rounded-md 
                                            ${!errors.email || !touched.email ? "" : 'border-red-400'}
                                        `}
                                        name={"email"}
                                    />
                                    <ErrorMessage
                                        className={"mt-1 text-xs text-red-500"}
                                        name={"email"}
                                        component={"div"}
                                    />
                                </div>
                            </div>

                            <div className={"flex justify-end mt-10"}>
                                <button
                                    type={"submit"}
                                    className={"w-full py-2.5 px-6 border bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium text-white"}
                                >
                                    Send
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    )
}
