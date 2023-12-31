import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    // console.log("Place: ", place);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PUT") {
    const placeUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json(placeUpdate);
  }
  if (request.method === "DELETE") {
    const placeDelete = await Place.findByIdAndDelete(id);
    response.status(200).json(placeDelete);
  }
}
