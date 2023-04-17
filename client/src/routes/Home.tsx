import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNotes } from "../components/GetNotes";
import { NoteList, NotePad } from "../components/NoteList";

export function Home() {
  getNotes();
  const initialNotes: NotePad[] = [];
  const [notepads, updateNotePads] = useState(initialNotes);

  useEffect(() => {
    getNotes().then((notepads) => {
      updateNotePads(notepads);
      /* console.log(notepads); */
    });
  }, []);
  return (
    <>
      <div className="bg-gray-200 m-10 rounded h-auto w-auto flex flex-col shadow-2xl justify-between sm:flex-row md:flex-row">
        <div className="flex-column p-5 w-full pr-0">
          <div className="flex justify-start align-center mx-5">
            <div className="bg-gray-300 rounded-md w-full max-w-[200px] flex justify-center items-center m-5">
              Notas
            </div>
          </div>
          <div className="max-h-screen overflow-auto">
            <NoteList notepads={notepads} />
          </div>
        </div>
        <Link to="/new">
          <div className="bg-slate-50 rounded m-5 py-5 w-80 h-[96%] flex justify-center items-center">
            <p className="opacity-30">
              Clique aqui para adicionar uma nova nota
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
