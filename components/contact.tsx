"use client";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import sendEmail from "@/lib/utils";

export type FormData = {
  nom: string;
  email: string;
  phone: string;
  sujet: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      nom: "",
      email: "",
      phone: "",
      sujet: "",
      message: ""
    }
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  function onSubmit(data: FormData) {
        sendEmail(data);
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset])
  return (
    <section className="bg-white dark:bg-slate-900 rounded-lg mb-9">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-slate-900 dark:text-white">
          Contactez-Nous
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-slate-500 dark:text-slate-400 sm:text-xl">
          Vous avez une demande ? Un renseignement ? Besoin de details pour
          notre business plan? Contactez-nous.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="nom"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
              >
                Votre nom
              </label>
              <input
                type="text"
                id="nom"
                className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Nom"
                {...register("nom", { required: "Ecrivez votre nom" })}
              />
              <p className="text-red-900 mt-1 text-sm">{errors.nom?.message}</p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
              >
                Votre email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Email"
                {...register("email", { required: "Veuillez saisir votre email" })}
              />
              <p className="text-red-900 mt-1 text-sm">{errors.email?.message}</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
            >
              Votre numero de telephone
            </label>
            <input
              type="tel"
              id="phone"
              pattern="[0-9]{10}"
              className="shadow-sm bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Ex: 06 07 04 31 25"
              {...register("phone", { required: "Veuillez saisir votre numero de telephone" })}
            />
            <p className="text-red-900 mt-1 text-sm">{errors.phone?.message}</p>
          </div>
          <div>
            <label
              htmlFor="sujet"
              className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-300"
            >
              Sujet
            </label>
            <select
              className="block p-3 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("sujet", { required: "Veuillez choir un sujet" })}
            >
              <option selected>Choisir un sujet</option>
              <option value="web">Developpement Web</option>
              <option value="mob">Developpement Mobile</option>
              <option value="graphisme">Graphisme et Design</option>
              <option value="marketing">Marketing Digitale</option>
              <option value="modele">Conception Modele</option>
              <option value="other">Autre sujet</option>
            </select>
            <p className="text-red-900 mt-1 text-sm">{errors.sujet?.message}</p>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-400"
            >
              Votre Message
            </label>
            <textarea
              rows={6}
              className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg shadow-sm border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Laissez un message..."
              {...register("message", { required: "Veuiller saisir votre message" })}
            />
            <p className="text-red-900 mt-1 text-sm">{errors.message?.message}</p>
          </div>
          <button
            type="submit"
            className="btn-blue dark:hover:shadow-bleu"
          >
            Envoyez message
          </button>

        </form>
      </div>
    </section>
  );
};

export default Contact;
