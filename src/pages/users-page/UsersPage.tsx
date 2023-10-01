// Gerekli kütüphanelerin ve bileşenlerin içe aktarılması
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import './User.css';
import { User } from "../../models";
import CustomNavbar from "../../components/NavBar/NavBar";
import Swal from "sweetalert2";
import Table from "../../components/GenericTable/GenericTable";
import { ScrollContainer } from "react-nice-scroll";

function UsersPage() {

  // Kullanıcı verilerini saklamak için bir durum değişkeni tanımlanır

  const [userData, setUsersData] = useState<User[]>([]);

  // Kullanıcı verilerini getiren işlev
  const UserDataFetch = async () => {
    try {
      const b = Swal.getHtmlContainer()?.querySelector('b');

      // Yükleniyor modalı gösterilir
      Swal.fire({
        title: 'Veriler Yükleniyor',
        html: "Lütfen Bekleyiniz...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // API'den kullanıcı verilerini getirir
      const response = await axios.get('https://dummyjson.com/users');
      setUsersData(response.data.users);

      // Yükleniyor modalı kapatılır
      Swal.close();
    } catch (error) {
      console.error('Hata:', error);
      // Hata durumunda kullanıcıya hata mesajı gösterilir
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // İlk render sırasında verileri getirir
  useEffect(() => {
    UserDataFetch();
  }, []);

  const headers = [
    'Profile',
    'FirstName',
    'LastName',
    'Age',
    'Gender',
    'Email',
    'Phone',
    'BirthDate',
  ];

  return (
    <>
      <CustomNavbar />
      <div className="container d-flex justify-content-center align-items-center user-page">
        <div className="container">
          <ScrollContainer>
            <section>
              <Table headers={headers} data={userData} />
            </section>
          </ScrollContainer>
        </div>
      </div>
    </>
  )
}

export default UsersPage;
