import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { api } from "../api";
import { getNotes } from "../components/GetNotes";
import { InputText } from "../components/InputText";
import { NoteList, NotePad } from "../components/NoteList";

const newNote = {
  title: "",
  subtitle: "",
  content: "",
};

export function NewNote() {
  getNotes();
  const initialNotes: NotePad[] = [];
  const [notepads, updateNotePads] = useState(initialNotes);

  /*   const [content, updateContent] = useState("");
  const [title, updateTitle] = useState("");
  const [subtitle, updateSubtitle] = useState(""); */

  const [form, updateForm] = useState(newNote);

  useEffect(() => {
    getNotes().then((notepads) => {
      updateNotePads(notepads);
      /* console.log(notepads); */
    });
  }, []);

  const redirect = useNavigate();

  return (
    <>
      <div
        id="frame"
        className="bg-gray-200 m-10 rounded h-auto w-auto flex flex-col shadow-2xl sm:flex-row"
      >
        <Link to="/">
          <div className="flex-column p-5 pr-0">
            <div className="bg-gray-300 rounded-md w-auto flex justify-center items-center m-5">
              Notas
            </div>
            <div className="max-h-screen overflow-auto">
              <Link to="/">
                <NoteList notepads={notepads} />
              </Link>
            </div>
          </div>
        </Link>
        <div className="bg-slate-50 rounded m-5 py-5 w-[90%] h-auto flex sm:w-full justify-between">
          <div>
            <InputText
              className="bg-slate-50 resize-none w-full h-[5%] mx-[1rem] py-1 outline-none"
              placeholder="digite aqui o titulo"
              value={form.title}
              onChange={(title) => {
                updateForm({ ...form, title });
              }}
            />

            <InputText
              className="bg-slate-50 resize-none w-full h-[5%] mx-[1rem] py-1 outline-none"
              placeholder="digite aqui o subtitulo"
              value={form.subtitle}
              onChange={(subtitle) => {
                updateForm({ ...form, subtitle });
              }}
            />

            <InputText
              className="bg-slate-50 resize-none w-full h-[20%] mx-[1rem]  outline-none"
              placeholder="digite aqui o conteúdo"
              value={form.content}
              onChange={(content) => {
                updateForm({ ...form, content });
              }}
            />
          </div>
          <div className="flex flex-col justify-end mx-10">
            <button
              className=" bg-gray-400 rounded-full px-4 pb-1 m-2 text-4xl flex justify-center items-center shadow-md"
              onClick={async (event) => {
                event.preventDefault();
                const post = await api.post("/notepads", form);

                if (post.data.success) {
                  toast("enviado com sucesso");
                  redirect("/");
                } else {
                  toast("erro ao enviar");
                }
                /* console.log(post.data.success); */
              }}
            >
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
