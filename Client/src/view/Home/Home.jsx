import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component"
import { useNavigate } from "react-router-dom"

import styles from "./Home.module.css"
import Add from '../Add/Add'
import Edit from "../Edit/Edit.jsx"

import deletee from "../../assets/eliminar.png"
import update from "../../assets/editar.png"
import updateNone from "../../assets/lapiz.png"
import cancelar from "../../assets/rechazar.png"
import imgSearch from "../../assets/lupa-de-busqueda.png"
import addUser from "../../assets/agregar-usuario.png"
import favorite from "../../assets/favorito.png"

import { useCandidatos } from "../../context/CandidatosContext"
import { useFav } from "../../context/FavoriteContext.jsx"


const Home = () => {
  const { getCandidatos, candidatos, deleteCandidatos } = useCandidatos()
  const [selectedRows, setSelectedRows] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const { createFav, AllFav, fav } = useFav()

  const navegar = useNavigate()
  
  const columns = [
    { name: "name", selector: row => row.name },
    { name: "email", selector: row => row.email },
    { name: "puesto", selector: row => row.puesto },
    { name: "Contacto", selector: row => row.contacto },
    { name: "Fecha", selector: row => row.date },
  ]  

  useEffect(() => {
      getCandidatos()
  }, [])

  const data = candidatos.data;

  const expandableData = (data) => {
    if(data.descripcion) {
      return data.descripcion
    } else {
      return "No hay descripcion"
    }
  }

  const handleDelete = async () => {
    if (selectedRows.length === 1) {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este candidato?');
        if (confirmDelete) {
            await deleteCandidatos(selectedRows[0]._id);
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

  const handleFavorito = async () => {
    const newData = [...fav];
    
    for (const selectedRow of selectedRows) {
      const isAlreadyFav = newData.some(el => el.email === selectedRow.email);
  
      if (isAlreadyFav) {
        alert("Candidato ya añadido");
        return;
      }
  
      await createFav(selectedRow);
    }
  
    navegar('/save');
  };
  
  
  
  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const [search, setSearch] = useState(data);
  const [query, setQuery] = useState("");

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


  // Logica de hide en Add
  const [ hide, setHide ] = useState(false)

  const handleHide = () => {
    setHide(!hide)
    // console.log(hide);
  }

  // Logica de Hide en Form de Edit
  const [ hideEditForm, setHideEditForm ] = useState(true)

  const handleHideEdit = () => {
    setHideEditForm(!hideEditForm)
    // console.log(selectedRows);
  }

  const handleHideX = () => {
    setHideEditForm(!hideEditForm)
    // console.log(hide);
  }

  return (
    <div className={styles.containerHome}>
        <div className={styles.containerHead}>
          <h1 className={styles.title}>Tabla de Candidatos</h1>
          <div className={styles.containerAddSearch}>
            <div className={styles.containerSearch}>
              <div className={styles.containerImgSearch}>
                <img src={imgSearch} alt='Search' className={styles.imgSearch}/>
              </div>
              <input 
                placeholder='Nombre'
                type='search' 
                onChange={handleSearch}
                className={styles.InputSearch}
              /> 
            </div>
            <button 
              className={styles.btnAdd} 
              onClick={handleHide}
            >
              <img src={addUser} alt='addUser' className={styles.imgAdd}/>
            </button>
          </div>
        </div>
        {selectedRows.length > 0 && (
          <div className={styles.containerBtn}>
            <button onClick={handleDelete} className={styles.btnAccion1}>
              <img src={deletee} alt='Delete'/>
            </button>
            {
              (selectedRows.length > 1) ?
              <button disabled  className={styles.btnEdit2}>
                <img src={updateNone} alt='Update' />
              </button>
                :
              <button onClick={handleHideEdit} className={styles.btnAccion2}>
              <img src={update} alt='Update' />
              </button>
            }
            
            <button onClick={handleFavorito} className={styles.btnAccion3}>
              <img src={favorite} alt='Favorite'/>
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

        { hide ? 
          <div className={styles.containerAddHome}>
            <div className={styles.containerAddX}>
              <button onClick={handleHide} className={styles.x}>X</button>
              <Add className={styles.add} /> 
            </div>
          </div> 
          : "" 
        }
        
        <div 
          className={hideEditForm ? styles.hidden : styles.containerAddHome}
        > 
          <div className={styles.containerAddX}>
            <button onClick={handleHideX} className={styles.x}>X</button>
            <Edit datos={data} selectedRows={selectedRows} className={styles.add} /> 
          </div>
        </div> 

    </div>
  )
}

export default Home