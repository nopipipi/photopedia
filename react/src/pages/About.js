import React, {Component} from 'react';

export default class About extends Component{
    render(){
        return(
            <div className="mt-3">
                <div className="container p-0 w-100 text-center">
                    <br/>
                    <h2 style={{height:'50px'}} className="text-primary">About Photopedia</h2>
                    <hr/>

                    <div style={{width:'100%',height:'550px',position:'relative'}}>
                        
                        <div style={{width:'30%',height:'550px',position:'absolute'}} className="border p-5 text-white bg-primary">
                            <h3 className="mt-5">Photopedia</h3>
                            <hr/>
                            <p> Photopedia menyediakan bermacam-macam foto, 
                            disini anda dapat membeli foto-foto yang ada secara online.
                            Anda hanya perlu menjadi anggota Photopedia terlebih dahulu
                            
                            </p>
                            <br/>
                        </div>

                   
                        <div style={{width:'30%',height:'550px',position:'absolute',left:'35%'}} className="p-5 text-white bg-primary">
                            <h3 className="mt-5">History</h3>
                            <hr/>
                            <p>Photopedia dikembangkan pada Tahun 2018 November.
                            Dengan desain yang sederhana Photopedia berhasil
                             menjadi pilihan terfavorit para photografer.
                            </p>
                            <br/>
                        </div>
                   
                    
                        <div style={{width:'30%',height:'550px',position:'absolute',left:'70%'}} className="p-5 text-white bg-primary">
                            <h3 className="mt-5">Owner</h3>
                            <hr/>
                            Photopedia didesain dan didirikan oleh sebuah kelompok kerjasama
                            yang beranggotakan 4 orang, yaitu: <br/>
                            Esther - 162110361 <br/>
                            Novi Adelia - 162110396 <br/>
                            Rio Irwanto - 162110060 <br/>
                            Sylvie Wijaya - 162110931 <br/>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}