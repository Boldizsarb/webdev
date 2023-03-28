
import mapDAO from "../dao/mapDAO.mjs";

class mapController{

    constructor(db){
        this.dao = new mapDAO(db,"artists")
    }


    getAllMarkers(req,res){
        const songs = this.dao.getAllMarkers();
        res.json(songs);
    }

    getArtist(req,res){
        try{
            const songs = this.dao.getArtist(req.params.artistp);
            res.json(songs);
            if(songs == null) {
                res.status(404).json({error: "No Artist with that name"});
            } else {
                res.json(songs);
            }
        }
        catch(e){
            res.status(500).json({error: e});
        }
    }

    addArtist(req, res) {
        const { name, lat, lon, hometown } = req.params;
        try {
            if (!name || !lat || !lon || !hometown) {
                res.status(400).json({ error: 'Missing required parameters' });
                return;
            }
            this.dao.addArtist(name, lat, lon, hometown);
            res.status(201).json({ message: 'Artist added successfully' });

        } catch (e) {
            res.status(500).json({error: e});
        }
    }




   
}
export default mapController;