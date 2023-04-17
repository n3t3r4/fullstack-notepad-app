import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-simple-toasts";
import { api } from "../api";

export function ViewNotePad() {
  const noteId = useParams();
  const redirect = useNavigate();

  const [notepad, updateNotepad] = useState({
    id: noteId.id,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  });

  useEffect(() => {
    api.get(`/notepads/${noteId.id}`).then((conex) => {
      const notepad = conex.data;
      updateNotepad(notepad);
      /* console.log(notepad); */
    });
  }, []);

  const date = new Date(notepad.created_at);

  return (
    <>
      <div className="my-4 mx-8 leading-8">
        <Link to="/">
          <button className="bg-gray-400 rounded-full py-1 px-4 my-2 text-sm flex justify-center items-center shadow-md">
            Voltar
          </button>
        </Link>
        <span className="font-extralight text-sm"># {notepad.id}</span>
        <p className="font-extralight text-sm">{date.toLocaleDateString()}</p>
        <h1 className="font-bold bg-white px-2">{notepad.title}</h1>
        <p className="text-sm bg-white px-2">{notepad.subtitle}</p>
        <p className="text-lg bg-white rounded py-5 px-2">{notepad.content}</p>
        <div className="flex flex-row gap-2">
          <Link to={`/edit/` + notepad.id}>
            <button className=" bg-gray-400 rounded-full py-1 px-4 my-2 text-sm flex justify-center items-center shadow-md">
              Editar
            </button>
          </Link>
          <button
            className=" bg-red-400 rounded-full py-1 px-4 my-2 text-sm flex justify-center items-center shadow-md"
            onClick={async () => {
              const res = await api.delete(`/notepads/${notepad.id}`);
              if (res.data.success) {
                toast("deletado com sucesso");
                redirect("/");
              } else {
                toast("erro ao deletar");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
