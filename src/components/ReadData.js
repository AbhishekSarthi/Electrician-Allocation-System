import React, { useEffect, useState } from "react";
import data1 from "../data/rawSiteData.json";
import data2 from "../data/electricianData.json";

const ReadData = () => {
  const [siteData, setSiteData] = useState(data1);
  const [electricianData, setElectricianData] = useState(data2);
  // const [resData, setResData] = useState([]);

  let grievanceElectrician = [];
  let generalElectrician = [];
  const date = "2023-10-25";

  function updateDate(date) {
    const originalDate = new Date(date);
    originalDate.setDate(originalDate.getDate() + 1);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  const AssignElectritianToSite = () => {
    // console.log(siteData);
    // console.log(electricianData);

    electricianData.forEach((ele) => {
      if (ele.grievanceElectrician === true) {
        grievanceElectrician.push({
          name: ele.name,
          count: 0,
          currentDate: date,
        });
      } else {
        generalElectrician.push({
          name: ele.name,
          count: 0,
          currentDate: date,
        });
      }
    });
    console.log(generalElectrician, grievanceElectrician);
    let grievanceIdx = 0;
    let generalIdx = 0;

    siteData.forEach((ele) => {
      if (ele.grievance === true) {
        let obj = {};
        obj["electritianName"] = grievanceElectrician[grievanceIdx].name;
        obj["electitianAssignedDate"] =
          grievanceElectrician[grievanceIdx].currentDate;
        grievanceElectrician[grievanceIdx].count += 1;
        if (grievanceElectrician[grievanceIdx].count >= 3) {
          grievanceElectrician[grievanceIdx].count = 0;
          grievanceElectrician[grievanceIdx].currentDate = updateDate(
            grievanceElectrician[grievanceIdx].currentDate
          );
        }
        grievanceIdx += 1;
        grievanceIdx = grievanceIdx % grievanceElectrician.length;

        ele.AssignedElectritian = obj;
      } else {
        let obj = {};
        obj["electritianName"] = generalElectrician[generalIdx].name;
        obj["electitianAssignedDate"] =
          generalElectrician[generalIdx].currentDate;
        generalElectrician[generalIdx].count += 1;
        if (generalElectrician[generalIdx].count >= 3) {
          generalElectrician[generalIdx].count = 0;
          generalElectrician[generalIdx].currentDate = updateDate(
            grievanceElectrician[grievanceIdx].currentDate
          );
        }
        generalIdx += 1;
        generalIdx = generalIdx % generalElectrician.length;

        ele.AssignedElectritian = obj;
      }
    });
    setSiteData([...siteData]);
    console.log(siteData);
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(e.target.id);
    siteData.forEach((ele) => {
      if (ele.name === e.target.id) {
        const currentDate = new Date(e.target.value);
        const currentTime = new Date();

        const year = currentDate.getUTCFullYear();
        const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(currentDate.getUTCDate()).padStart(2, "0");
        const hours = String(currentTime.getUTCHours()).padStart(2, "0");
        const minutes = String(currentTime.getUTCMinutes()).padStart(2, "0");
        const seconds = String(currentTime.getUTCSeconds()).padStart(2, "0");
        const milliseconds = String(currentTime.getUTCMilliseconds()).padStart(
          3,
          "0"
        );

        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

        ele.InstallationDate = formattedDateTime;
        console.log(formattedDateTime);
      }
    });

    setSiteData([...siteData]);
  };
  useEffect(() => {
    siteData.sort(
      (a, b) => new Date(a.InstallationDate) - new Date(b.InstallationDate)
    );
    console.log(siteData);

    setSiteData([...siteData]);
  }, []);

  return (
    <div>
      <h2>Electrician Data</h2>{" "}
      <button onClick={AssignElectritianToSite}>Assign Sites</button>
      {siteData.map((singleData) => {
        return (
          <div className="box" key={singleData.name}>
            <h4>Name : {singleData.name}</h4>
            <h4>Phone : {singleData.phone}</h4>
            <h4>City : {singleData.city}</h4>
            <h4>
              Assigned Electritian :{" "}
              {singleData.AssignedElectritian.electritianName}
              {singleData.AssignedElectritian.electritianName && (
                <>, {singleData.AssignedElectritian.electitianAssignedDate}</>
              )}
            </h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4>InstallationDate : {singleData.InstallationDate} </h4>{" "}
              <input
                type="date"
                id={singleData.name}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <h4>grievance : {singleData.grievance ? "True" : "False"} </h4>
          </div>
        );
      })}
    </div>
  );
};

export default ReadData;
