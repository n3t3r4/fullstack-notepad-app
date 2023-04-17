import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-simple-toasts";
import { api } from "../api";
import { InputText } from "../components/InputText";

export function EditNotePad() {
  const noteId = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    api.get(`/notepads/${noteId.id}`).then((conex) => {
      const notepad = conex.data;
      updateNotepad(notepad);
      /* console.log(notepad); */
    });
  }, []);

  const [notepad, updateNotepad] = useState({
    id: noteId.id,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  });

  const date = new Date(notepad.created_at);

  return (
    <>
      <div className="pb-8 my-4 mx-8 leading-8">
        <div className="flex flex-row gap-2">
          <button
            className=" bg-gray-400 rounded-full py-1 px-4 my-2 text-sm flex justify-center items-center shadow-md"
            onClick={async () => {
              const res = await api.put(`/notepads/${notepad.id}`, notepad);

              if (res.data.success) {
                toast("alterado com sucesso");
                redirect(`/notepad/` + notepad.id);
              } else {
                toast("erro ao alterar");
              }
            }}
          >
            Salvar
          </button>
          <Link to={`/notepad/` + notepad.id}>
            <button className=" bg-red-400 rounded-full py-1 px-4 my-2 text-sm flex justify-center items-center shadow-md">
              Cancelar
            </button>
          </Link>
        </div>
        <span className="font-extralight text-sm"># {notepad.id}</span>
        <p className="font-extralight text-sm">{date.toLocaleDateString()}</p>
        <InputText
          onChange={(title) => {
            updateNotepad({ ...notepad, title });
          }}
          placeholder=""
          className="font-bold bg-white px-2 resize-none w-full h-[5%] py-1 outline-none"
          value={notepad.title}
        />
        <InputText
          onChange={(subtitle) => {
            updateNotepad({ ...notepad, subtitle });
          }}
          placeholder=""
          className="text-sm px-2 bg-white resize-none w-full h-[5%] py-1 outline-none"
          value={notepad.subtitle}
        />
        <InputText
          onChange={(content) => {
            updateNotepad({ ...notepad, content });
          }}
          placeholder=""
          className="text-lg bg-white rounded py-5 px-2 resize-none w-full h-[20%] outline-none"
          value={notepad.content}
        />
      </div>
    </>
  );
}
