  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import {getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyACgRLhGABL2Mnl96Z2eBaDgvyu3AF78sE",
    authDomain: "symptomtracker-6d316.firebaseapp.com",
    projectId: "symptomtracker-6d316",
    storageBucket: "symptomtracker-6d316.appspot.com",
    messagingSenderId: "611112098886",
    appId: "1:611112098886:web:ea7261c851678404f77e47"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function getSymptoms(db) {
    const symCol = collection(db, "symptoms")
    const symSnapshot = await getDocs(symCol);
    const symList = symSnapshot.docs.map((doc) => doc.data());
    return symList;
  }

  const symptomList = document.querySelector('#symptom-list');
  const form = document.querySelector('#add-sym-form')

  function renderSymptoms(dc) {
      let li = document.createElement("li");
      let level = document.createElement("span");
      let symdate = document.createElement("span");
      let symptomdesc = document.createElement("span");
      let cross = document.createElement('div');

      li.setAttribute('data-id', dc.id);
      level.textContent = dc.data().level;
      symdate.textContent = dc.data().symdate;
      symptomdesc.textContent = dc.data().symptomdesc;
      cross.textContent = 'x';

      li.appendChild(level);
      li.appendChild(symdate);
      li.appendChild(symptomdesc);
      li.appendChild(cross);

      symptomList.appendChild(li);

      cross.addEventListener('click', (e) => {
          e.stopPropagation();
          let id = e.target.parentElement.getAttribute('data-id');
          deleteDoc(doc(db, "symptoms", id))
      })
  }

  const sym = getDocs(collection(db, "symptoms")).then((snapshot) => {
      snapshot.forEach((doc) => {
          renderSymptoms(doc)
      })
  })

 /*  const q = query(collection(db, "symptoms"), where("city", "==", "hays"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data())
  }) */

 /*  const upDoc = doc(db, "symptoms", "NqdfSNCSl0QgHVqoGOh1");

  updateDoc(upDoc, {
      name: "Papa murphy"
  }) */

  form.addEventListener(('submit'), (e) => {
      e.preventDefault();
      const docRef = addDoc(collection(db, "symptoms"), {
          level: form.formsev.value,
          symdate: form.formdate.value,
          symptomdesc: form.formdesc.value
      })
  })