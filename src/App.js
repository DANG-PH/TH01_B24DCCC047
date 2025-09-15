import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

// ================= Bài 1 =================
function CongViec({ ten, onXoa }) {
  return <li className="flex justify-between items-center p-2 border-b">
          <span>{ten}</span>
          <button 
            onClick={onXoa} 
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Xóa
          </button>
        </li>;
}

function DanhSachCongViec() {
  const [congViec, setCongViec] = useState("");
  const [ds, setDs] = useState([]);
  const themCongViec = () => {
    if (congViec.trim() !== "") {
      setDs([...ds, congViec]);
      setCongViec("");
    }
  };

  const xoaCongViec = (index) => {
    setDs(ds.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Bài 1: Danh sách công việc</h3>
      <input
        type="text"
        value={congViec}
        onChange={(e) => setCongViec(e.target.value)}
        placeholder="Nhập công việc"
      />
      <button onClick={themCongViec}>Thêm</button>
      <ul>
        {ds.map((item, index) => (
          <CongViec key={index} ten={item} onXoa={() => xoaCongViec(index)} />
        ))}
      </ul>
    </div>
  );
}

// ================= Bài 2 =================
function HopMau({ mau }) {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: mau,
        marginTop: "10px",
        border: "1px solid black",
      }}
    />
  );
}

function DoiMauNen() {
  const [mau, setMau] = useState("white");
  const dsMau = ["red", "green", "blue", "yellow"];

  return (
    <div>
      <h3>Bài 2: Ứng dụng đổi màu nền</h3>
      {dsMau.map((m, i) => (
        <button key={i} onClick={() => setMau(m)}>
          {m}
        </button>
      ))}
      <HopMau mau={mau} />
    </div>
  );
}

// ================= Bài 3 =================
function GioHang() {
  const sanPham = [
    { ten: "Sách", gia: 10000 },
    { ten: "Bút", gia: 5000 },
    { ten: "Vở", gia: 7000 }
  ];

  const [gioHang, setGioHang] = useState([]);

  const themVaoGio = (sp) => {
    let daCo = gioHang.find(item => item.ten === sp.ten);
    if (daCo) {
      setGioHang(gioHang.map(item =>
        item.ten === sp.ten ? { ...item, soLuong: item.soLuong + 1 } : item
      ));
    } else {
      setGioHang([...gioHang, { ...sp, soLuong: 1 }]);
    }
  };

  const xoaAllGioHang = () => {
    setGioHang([])
  }

  // const tongTien = gioHang.reduce((sum, sp) => sum + sp.gia * sp.soLuong, 0);
  let tongTienTinhToan = 0;
  for (let i = 0; i < gioHang.length; i++) {
    tongTienTinhToan += gioHang[i].gia * gioHang[i].soLuong;
  }
  const tongTien = tongTienTinhToan;

  return (
    <div>
      <h3>Bài 3: Giỏ hàng</h3>
      <h4>Sản phẩm</h4>
      <ul>
        {sanPham.map((sp, i) => (
          <li key={i}>
            {sp.ten} - {sp.gia}đ{" "}
            <button onClick={() => themVaoGio(sp)}>Thêm vào giỏ</button>
          </li>
        ))}
      </ul>

      <h4>Giỏ hàng</h4>
      <ul>
        {gioHang.map((sp, i) => (
          <li key={i}>
            {sp.ten} - {sp.gia}đ x {sp.soLuong}
          </li>
        ))}
      </ul>
      <p><b>Tổng tiền:</b> {tongTien}đ</p>
      <button onClick={xoaAllGioHang}>Clear All</button>
    </div>
  );
}


// ================= Bài 4 =================
function Post({ noiDung, like, dislike, onLike, onDislike }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
      <p>{noiDung}</p>
      <button onClick={onLike}>👍 {like}</button>
      <button onClick={onDislike} style={{ marginLeft: "10px" }}>
        👎 {dislike}
      </button>
    </div>
  );
}

function LikeDislikePost() {
  const [posts, setPosts] = useState([
    { noiDung: "Học ReactJS có khó không?", like: 0, dislike: 0 },
    { noiDung: "Props và State là gì?", like: 0, dislike: 0 },
    { noiDung: "Lập trình web có vui không?", like: 0, dislike: 0 },
  ]);

  const tangLike = (index) => {
    const newPosts = [...posts];
    newPosts[index].like++;
    setPosts(newPosts);
  };

  const tangDislike = (index) => {
    const newPosts = [...posts];
    newPosts[index].dislike++;
    setPosts(newPosts);
  };

  return (
    <div>
      <h3>Bài 4: Like/Dislike Post</h3>
      {posts.map((p, i) => (
        <Post
          key={i}
          noiDung={p.noiDung}
          like={p.like}
          dislike={p.dislike}
          onLike={() => tangLike(i)}
          onDislike={() => tangDislike(i)}
        />
      ))}
    </div>
  );
}


// ================= Bài 5 =================
function QuizApp() {
  const questions = [
    {
      question: "ReactJS dùng để làm gì?",
      answers: ["Mobile App", "Web UI", "Hệ điều hành", "Cơ sở dữ liệu"],
      correct: 1, 
    },
    {
      question: "Hook nào dùng để quản lý state?",
      answers: ["useState", "useEffect", "useMemo", "useRef"],
      correct: 0,
    },
    {
      question: "JSX là gì?",
      answers: ["Một ngôn ngữ mới","Cú pháp mở rộng của JavaScript","Thư viện CSS","Framework backend" ],
      correct: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    if (selected === null) {
      setSelected(index);
      if (index === questions[current].correct) {
        setScore(score + 1);
      }
      setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent(current + 1);
          setSelected(null);
        } else {
          setShowResult(true);
        }
      }, 800);
    }
  };

  return (
    <div>
      <h3>Bài 5: Quiz App</h3>
      {showResult ? (
        <h4>Bạn trả lời đúng {score}/{questions.length} câu!</h4>
      ) : (
        <div>
          <p>{questions[current].question}</p>
          {questions[current].answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                margin: "5px",
                backgroundColor:
                  selected === i
                    ? i === questions[current].correct
                      ? "lightgreen"
                      : "salmon"
                    : "",
              }}
            >
              {ans}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ================= Quản lý bài toán =================
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <DanhSachCongViec />
      <hr />
      <DoiMauNen />
      <hr />
      <GioHang />
      <hr />
      <LikeDislikePost />
      <hr />
      <QuizApp />
    </div>
  );
}

export default App;
