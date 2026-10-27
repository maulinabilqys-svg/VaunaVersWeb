
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     1. FILTER DAN PENCARIAN HEWAN
  ========================= */
  const tombolFilter = document.querySelectorAll(".filter-btn");
  const kartuHewan = document.querySelectorAll(".animal");
  const kolomCari = document.querySelector(
    '#search, #animalSearch, input[type="search"]'
  );

  let kategoriAktif = "Semua";

  function filterHewan() {
    const kataCari = kolomCari
      ? kolomCari.value.toLowerCase().trim()
      : "";

    kartuHewan.forEach(function (kartu) {
      const teks = kartu.innerText.toLowerCase();
      const cocokKategori =
        kategoriAktif === "Semua" ||
        teks.includes(kategoriAktif.toLowerCase());
      const cocokCari = teks.includes(kataCari);

      kartu.style.display =
        cocokKategori && cocokCari ? "" : "none";
    });
  }

  tombolFilter.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      kategoriAktif = tombol.dataset.filter;

      tombolFilter.forEach(function (item) {
        item.classList.remove("active");
      });

      tombol.classList.add("active");
      filterHewan();
    });
  });

  if (kolomCari) {
    kolomCari.addEventListener("input", filterHewan);
  }


  /* =========================
     2. KUIS INTERAKTIF
  ========================= */
  const pertanyaan = [
    {
      soal: "Hewan manakah yang termasuk mamalia?",
      pilihan: ["Buaya", "Orangutan", "Elang", "Ikan tuna"],
      benar: "Orangutan"
    },
    {
      soal: "Apa alat pernapasan utama ikan?",
      pilihan: ["Paru-paru", "Kulit", "Insang", "Trakea"],
      benar: "Insang"
    },
    {
      soal: "Manakah yang termasuk kelompok aves?",
      pilihan: ["Katak", "Elang", "Komodo", "Hiu"],
      benar: "Elang"
    },
    {
      soal: "Di manakah habitat utama katak?",
      pilihan: ["Air dan darat", "Gurun saja", "Kutub", "Laut dalam"],
      benar: "Air dan darat"
    },
    {
      soal: "Hewan manakah yang termasuk reptil?",
      pilihan: ["Kucing", "Salamander", "Komodo", "Ikan pari"],
      benar: "Komodo"
    }
  ];

  const areaKuis = document.getElementById("quiz");
  const teksSoal = document.getElementById("question");
  const areaPilihan = document.getElementById("options");
  const nomorSoal = document.getElementById("qCount");
  const labelSoal = document.getElementById("qLabel");
  const feedback = document.getElementById("feedback");
  const tombolBerikutnya = document.getElementById("next");
  const areaHasil = document.getElementById("result");
  const judulHasil = document.getElementById("resultTitle");
  const skorHasil = document.getElementById("score");
  const pesanHasil = document.getElementById("resultMessage");
  const tombolUlang = document.getElementById("restart");
  const bar = document.getElementById("bar");

  if (
    areaKuis && teksSoal && areaPilihan &&
    nomorSoal && tombolBerikutnya && areaHasil
  ) {
    let indeksSoal = 0;
    let skor = 0;
    let sudahMenjawab = false;

    function tampilkanSoal() {
      sudahMenjawab = false;
      const data = pertanyaan[indeksSoal];

      teksSoal.textContent = data.soal;
      nomorSoal.textContent =
        String(indeksSoal + 1).padStart(2, "0") + " / 05";

      if (labelSoal) {
        labelSoal.textContent = "PERTANYAAN " + (indeksSoal + 1);
      }

      if (bar) {
        bar.style.width =
          ((indeksSoal + 1) / pertanyaan.length * 100) + "%";
      }

      areaPilihan.innerHTML = "";
      feedback.textContent = "Pilih satu jawaban.";
      tombolBerikutnya.disabled = true;
      tombolBerikutnya.textContent =
        indeksSoal === pertanyaan.length - 1
          ? "Lihat Hasil →"
          : "Berikutnya →";

      data.pilihan.forEach(function (pilihan) {
        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.className = "quiz-option";
        tombol.textContent = pilihan;

        tombol.addEventListener("click", function () {
          if (sudahMenjawab) return;
          sudahMenjawab = true;

          areaPilihan.querySelectorAll("button").forEach(function (item) {
            item.disabled = true;

            if (item.textContent === data.benar) {
              item.classList.add("correct");
            }
          });

          if (pilihan === data.benar) {
            skor++;
            feedback.textContent = "Benar! Hebat! 🎉";
          } else {
            tombol.classList.add("wrong");
            feedback.textContent =
              "Belum tepat. Jawaban: " + data.benar;
          }

          tombolBerikutnya.disabled = false;
        });

        areaPilihan.appendChild(tombol);
      });
    }

    tombolBerikutnya.addEventListener("click", function () {
      if (!sudahMenjawab) return;

      indeksSoal++;

      if (indeksSoal < pertanyaan.length) {
        tampilkanSoal();
      } else {
        areaKuis.hidden = true;
        areaHasil.hidden = false;
        judulHasil.textContent =
          skor >= 4 ? "Luar biasa! 🏆" : "Tetap semangat! 🌱";
        skorHasil.textContent = skor + "/5";
        pesanHasil.textContent =
          "Kamu menjawab " + skor + " dari 5 pertanyaan dengan benar.";
      }
    });

    if (tombolUlang) {
      tombolUlang.addEventListener("click", function () {
        indeksSoal = 0;
        skor = 0;
        areaKuis.hidden = false;
        areaHasil.hidden = true;
        tampilkanSoal();
      });
    }

    tampilkanSoal();
  }


  /* =========================
     3. HEWAN PILIHAN HARI INI
  ========================= */
  const daftarHewan = [
    {
      nama: "Harimau",
      kelas: "Mamalia",
      habitat: "Hutan tropis dan padang rumput",
      gambar: "Gambar Binatang/Harimau.jpeg",
      deskripsi: "Harimau adalah kucing besar yang menjadi predator.",
      fakta: "Pola belang setiap harimau berbeda satu sama lain."
    },
    {
      nama: "Komodo",
      kelas: "Reptil",
      habitat: "Pulau-pulau di Nusa Tenggara Timur",
      gambar: "Gambar Binatang/komodo.jpeg",
      deskripsi: "Komodo merupakan kadal terbesar yang masih hidup.",
      fakta: "Komodo menggunakan lidahnya untuk mendeteksi bau."
    },
    {
      nama: "Burung Cendrawasih",
      kelas: "Aves",
      habitat: "Hutan Papua",
      gambar: "Gambar Binatang/cendrawasih.jpeg",
      deskripsi: "Cendrawasih terkenal dengan bulunya yang indah.",
      fakta: "Sebagian cendrawasih jantan memiliki bulu hias yang menarik."
    },
    {
      nama: "Ikan Badut",
      kelas: "Pisces",
      habitat: "Terumbu karang di perairan tropis",
      gambar: "Gambar Binatang/ikan badut.jpeg",
      deskripsi: "Ikan badut hidup berdampingan dengan anemon laut.",
      fakta: "Lapisan lendirnya membantu melindunginya dari sengatan anemon."
    },
    {
      nama: "Katak",
      kelas: "Amfibi",
      habitat: "Lingkungan lembap dan dekat air",
      gambar: "Gambar Binatang/katak.jpeg",
      deskripsi: "Katak adalah amfibi yang umumnya hidup di lingkungan lembap.",
      fakta: "Banyak katak dapat menyerap air melalui kulitnya."
    }
  ];

  const gambarHarian = document.getElementById("gambarHarian");
  const kelasHarian = document.getElementById("kelasHarian");
  const habitatHarian = document.getElementById("habitatHarian");
  const namaHarian = document.getElementById("namaHarian");
  const deskripsiHarian = document.getElementById("deskripsiHarian");
  const faktaHarian = document.getElementById("faktaHarian");
  const tanggalHarian = document.getElementById("tanggalHarian");
  const tombolHarian = document.getElementById("nextDaily");

  if (
    gambarHarian && kelasHarian && habitatHarian &&
    namaHarian && deskripsiHarian && faktaHarian && tombolHarian
  ) {
    let indeksHewan = new Date().getDate() % daftarHewan.length;

    function tampilkanHewan() {
      const hewan = daftarHewan[indeksHewan];

      gambarHarian.src = hewan.gambar;
      gambarHarian.alt = hewan.nama;
      kelasHarian.textContent = hewan.kelas;
      habitatHarian.textContent = "Habitat: " + hewan.habitat;
      namaHarian.textContent = hewan.nama;
      deskripsiHarian.textContent = hewan.deskripsi;
      faktaHarian.textContent = hewan.fakta;

      if (tanggalHarian) {
        tanggalHarian.textContent = new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }
    }

    gambarHarian.onerror = function () {
      console.error(
        "Foto tidak ditemukan. Periksa nama dan lokasi file:",
        gambarHarian.getAttribute("src")
      );
    };

    tombolHarian.addEventListener("click", function () {
      indeksHewan = (indeksHewan + 1) % daftarHewan.length;
      tampilkanHewan();
    });

    tampilkanHewan();
  }

});
