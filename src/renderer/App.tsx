import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FTPFolder from './ftp';
import FileUpload from './fileupload';
import FileList from './filelist';

// App Layout Component
function AppLayout() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Menu with fixed positioning and no padding */}
        <nav
          className="col-md-2 d-none d-md-block bg-light sidebar p-0"
          style={{ position: 'fixed', top: 0, bottom: 0 }}
        >
          <div className="sidebar-sticky">
            <ul className="list-group">
              <li className="list-group-item">
                <Link className="nav-link" to="/filelist">
                  File Converted List
                </Link>
              </li>
              <li className="list-group-item">
                {' '}
                <Link className="nav-link" to="/upload">
                  Upload File
                </Link>
              </li>
              <li className="list-group-item">
                <Link className="nav-link" to="/ftp">
                  FTP Folder
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Right Content (offset to leave space for the sidebar) */}
        <main
          role="main"
          className="col-md-9 ml-sm-auto col-lg-10 offset-md-2 px-md-4"
        >
          <Routes>
            <Route path="/filelist" element={<FileList />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/ftp" element={<FTPFolder />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
