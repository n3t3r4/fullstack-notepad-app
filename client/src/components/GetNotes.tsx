/* export async function getNotes() {
  const res = await fetch("https://webservices.jumpingcrab.com/notepads");
  const notesData = await res.json();

  return notesData;
}
 */

import axios from "axios";
import { api } from "../api";

export async function getNotes() {
  const conex = await api.get("/notepads");

  const notepads = conex.data;

  return notepads;
}
