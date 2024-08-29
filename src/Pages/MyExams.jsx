
export default function MyExams() {
    const arr = [1,2,3,4,5,6]
    return (
        <div className="container pt-5">
            <h2 className=" mb-4">نتائج الامتحانات </h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">المادة</th>
                        <th scope="col">النقاط</th>
                        <th scope="col">التقدير</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((result, index) => (
                        <tr key={index}>
                            <td>الكيمياء</td>
                            <td>88</td>
                            <td>B+</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

