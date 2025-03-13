export default function RabattTabelle() {
    const rabatte = [
        { menge: "2", rabatt: "-10% Rabatt 🔥" },
        { menge: "3", rabatt: "-15% Rabatt 😍" },
        { menge: "5", rabatt: "-40% Rabatt 😱" },
    ];

    return (
        <>
        <h3 className="mt-6 text-lg font-semibold text-TextSec">Rabatte:</h3>
        <div className="w-full p-4 border-2 border-BgSec rounded-lg">
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b text-center text-TextPrim">
                        <th className="p-2 font-semibold">Kaufen Sie</th>
                        <th className="p-2 font-semibold">Für</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {rabatte.map((item, index) => (
                        <tr key={index} className="text-TextSec">
                            <td className="p-2">{item.menge} Cases</td>
                            <td className="p-2 text-BrandRedLight font-medium">{item.rabatt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
