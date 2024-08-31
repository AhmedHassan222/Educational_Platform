export default function GetAllTeachers() {
    const arr = [1,2,3,4,5,6,7,8,9]
    return <>
        <div className="container py-5">
            <table className="table table-striped  table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((item ,index) => <tr key={index}>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                   )}
                </tbody>

            </table>
        </div>
    </>
}