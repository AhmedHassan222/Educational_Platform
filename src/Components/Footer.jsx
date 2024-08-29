import React from 'react';
import logo from "../../src/Assets/Images/logo.png"
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div className="me-5 d-none d-lg-block">
                    <span>تواصل معنا عبر شبكات التواصل الاجتماعي:</span>
                </div>

                <div>
                    <Link to={'/'} className="me-4 text-reset">
                        <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link to={'/'} className="me-4 text-reset">
                        <i className="fab fa-twitter"></i>
                    </Link>
                    <Link to={'/'} className="me-4 text-reset">
                        <i className="fab fa-google"></i>
                    </Link>
                    <Link to={'/'} className="me-4 text-reset">
                        <i className="fab fa-instagram"></i>
                    </Link>
                    <Link to={'/'} className="me-4 text-reset">
                        <i className="fab fa-linkedin"></i>
                    </Link>
                    <Link to={'/'} className="me-4 text-reset">
                        <i className="fab fa-github"></i>
                    </Link>
                </div>
            </section>

            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-center">
                            <img src={logo} alt="sky academy online" className="mb-4 w-25" />
                            <p>
                                منصة التعليم توفر بيئة تفاعلية غنية بالموارد التعليمية المتنوعة، تُمكن المتعلمين من اكتساب المهارات والمعرفة بطريقة مرنة ومناسبة لاحتياجاتهم الشخصية. تجمع بين التعليم الذاتي والتفاعل مع المعلمين والمجتمع التعليمي لتعزيز الفهم وتحقيق الأهداف الأكاديمية والمهنية.
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                الخدمات
                            </h6>

                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                روابط مفيدة
                            </h6>

                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">تواصل معنا</h6>
                            <p><i className="fas fa-home me-3"></i> ابو يوسف العجمي</p>
                            <p>
                                <i className="fas fa-envelope me-3"></i>
                                info@example.com
                            </p>
                            <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                            <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                © 2024 Copyright
            </div>
        </footer>
    );
};

