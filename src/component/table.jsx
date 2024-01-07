import React from 'react';

const DataTable = ({ data }) => {
  console.log(typeof data)
  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto scrollbar-hide w-auto">
        <table className=" bg-white border rounded-md border-stone-400 w-[87vw]">
          <thead>
            <tr>
              <th className="border rounded-lg border-black text-[12px]">Date</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Symbol</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Position Size</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Position Size %</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">RPT</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">RPT %</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Exit %</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Exit Price</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Gain %</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Account Gain %</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">ROI%</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Days</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">RR</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Charges</th>
              <th className="py-2 px-4 border rounded-lg border-black text-[12px]">Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(entry => entry.Symbol).map((entry, index) =>(
              
              <tr key={index} className='text-center'>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry.Date}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px] font-semibold">{entry.Symbol}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Position Size']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Position Size %']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry.RPT}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['RPT %']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Exit %']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Exit Price']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Gain %']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Account Gain %']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['ROI%']}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry.Days}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry.RR}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry.Charges}</td>
                <td className="py-2 px-4 border rounded-lg border-black text-[12px]">{entry['Net Profit']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
