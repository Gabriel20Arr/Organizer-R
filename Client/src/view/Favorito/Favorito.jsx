import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useFav } from "../../context/FavoriteContext";

import styles from './Favorito.module.css';

import deletee from "../../assets/eliminar.png"
import cancelar from "../../assets/rechazar.png"
import imgSearch from "../../assets/lupa-de-busqueda.png"

const Favorito = () => {
  const { AllFav, fav, deletFav } = useFav();
  const [data, setData] = useState(fav);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  useEffect(() => {
    async function getFavAll() {
      try {
        await AllFav();
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    getFavAll();
  }, []);

  useEffect(() => {
    setData(fav);
    setSearch(fav);
  }, [fav]);

  const columns = [
    { name: "name", selector: row => row.name },
    { name: "email", selector: row => row.email },
    { name: "puesto", selector: row => row.puesto },
    { name: "Contacto", selector: row => row.contacto },
    { name: "Fecha", selector: row => row.date },
  ];

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const expandableData = (data) => {
    if (data.descripcion) {
      return data.descripcion;
    } else {
      return "No hay descripcion";
    }
  };

  useEffect(() => {
    if (query === "") {
      setSearch(data);
    } else {
      const resData = data.filter(el =>
        el.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearch(resData);
    }
  }, [query, data]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleDelete = async () => {
    if (selectedRows.length === 1) {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este candidato?');
        if (confirmDelete) {
            await deletFav(selectedRows[0]._id);
            setSelectedRows([]);
            setToggleClearRows(!toggledClearRows);
        }
    } else {
        alert('Por favor, selecciona un candidato para eliminar.');
    }
};

  const handleCancel = () => {
    setSelectedRows([]);
    setToggleClearRows(!toggledClearRows);
  }

  return (
    <div className={styles.containerHome}>
      <div className={styles.containerHead}>
        <h1 className={styles.title}>Tabla Favoritos</h1>
        <div className={styles.containerAddSearch}>
          <div className={styles.containerSearch}>
            <div className={styles.containerImgSearch}>
              <img src={imgSearch} alt='Search' className={styles.imgSearch} />
            </div>
            <input 
              placeholder='Nombre'
              type='search' 
              onChange={handleSearch}
              className={styles.InputSearch}
            /> 
          </div>
        </div>
      </div>
        {selectedRows.length > 0 && (
          <div className={styles.containerBtn}>
            <button onClick={handleDelete} className={styles.btnAccion1}>
              <img src={deletee} alt='Delete'/>
            </button>

            <button onClick={handleCancel} className={styles.btnAccion4}>
              <img src={cancelar} alt='Cancelar'/>
            </button>
          </div>
        )}

      <DataTable 
        columns={columns}
        data={search}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggledClearRows}
        pagination
        expandableRows
        expandOnRowDoubleClicked
        expandableRowsComponent={({ data }) => <div className={styles.Descripcion}>{expandableData(data)}</div>}
      /> 
    </div>
  );
};

export default Favorito;
