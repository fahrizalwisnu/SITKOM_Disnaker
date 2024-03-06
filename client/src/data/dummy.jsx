import { IoPeople } from 'react-icons/io5'
import { IoIosPeople } from 'react-icons/io'
import { FaChalkboardTeacher } from 'react-icons/fa'
import {
  RiCustomerServiceFill,
  RiDashboardLine,
  RiContactsFill
} from 'react-icons/ri'
import { BsCardHeading } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'

export const linksSuperadmin = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        path: '/dashboard',
        icon: <RiDashboardLine />
      }
    ]
  },

  {
    title: 'Halaman',
    links: [
      {
        name: 'pelatihan',
        path: '/training',
        icon: <FaChalkboardTeacher />
      },
      {
        name: 'pengaduan',
        path: '/complaint',
        icon: <RiCustomerServiceFill />
      },
      {
        name: 'kartu kuning',
        path: '/yellowcard',
        icon: <BsCardHeading />
      }
    ]
  },
  {
    title: 'Pengguna',
    links: [
      {
        name: 'admin',
        path: '/admin',
        icon: <IoPeople />
      },
      {
        name: 'trainer',
        path: '/trainer',
        icon: <IoIosPeople />
      },
      {
        name: 'peserta',
        path: '/participant',
        icon: <RiContactsFill />
      }
    ]
  }
]

export const linksAdmin = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        path: '/dashboard',
        icon: <RiDashboardLine />
      }
    ]
  },

  {
    title: 'Halaman',
    links: [
      {
        name: 'pelatihan',
        path: '/training',
        icon: <FaChalkboardTeacher />
      },
      {
        name: 'pengaduan',
        path: '/complaint',
        icon: <RiCustomerServiceFill />
      },
      {
        name: 'kartu kuning',
        path: '/yellowcard',
        icon: <BsCardHeading />
      }
    ]
  },
  {
    title: 'Pengguna',
    links: [
      {
        name: 'trainer',
        path: '/trainer',
        icon: <IoIosPeople />
      },
      {
        name: 'peserta',
        path: '/participant',
        icon: <RiContactsFill />
      }
    ]
  }
]

export const linksTrainer = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'dashboard',
        path: '/dashboard',
        icon: <RiDashboardLine />
      }
    ]
  },

  {
    title: 'Halaman',
    links: [
      {
        name: 'pelatihan',
        path: '/training',
        icon: <FaChalkboardTeacher />
      }
    ]
  },
  {
    title: 'Pengguna',
    links: [
      {
        name: 'peserta',
        path: '/participant',
        icon: <RiContactsFill />
      }
    ]
  }
]

export const linksParticipant = [
  {
    name: 'profil',
    path: '/account/profile',
    icon: <MdAccountCircle />
  },
  {
    name: 'pelatihan',
    path: '/account/training',
    icon: <FaChalkboardTeacher />
  },
  {
    name: 'kartu kuning',
    path: '/account/yellowcard',
    icon: <BsCardHeading />
  }
]

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5'
  },
  {
    name: 'green-theme',
    color: '#03C9D7'
  },
  {
    name: 'purple-theme',
    color: '#7352FF'
  },
  {
    name: 'red-theme',
    color: '#FF5C8E'
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7'
  },
  {
    name: 'orange-theme',
    color: '#FB9678'
  }
]

const trainerGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10 object-cover object-center"
      src={`http://localhost:8082/uploads/${
        props.foto ? props.foto : 'profil.jpg'
      }`}
      alt="trainer"
    />
    <div>
      <p>{props.nama}</p>
    </div>
  </div>
)

const trainerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p
      style={{ background: props.StatusBg }}
      className="rounded-full h-3 w-3"
    />
    <p>{props.Status}</p>
  </div>
)

export const trainersGrid = [
  {
    headerText: 'Nama',
    width: '150',
    template: trainerGridImage,
    textAlign: 'Center'
  },
  {
    field: 'email',
    headerText: 'Email',
    width: '150',
    textAlign: 'Center'
  }
  // {
  //   field: 'Status',
  //   headerText: 'Status',
  //   width: '130',
  //   format: 'yMd',
  //   textAlign: 'Center',
  //   template: trainerGridStatus
  // },
  // {
  //   field: 'Weeks',
  //   headerText: 'Weeks',
  //   width: '100',
  //   format: 'C2',
  //   textAlign: 'Center'
  // },
  // {
  //   field: 'Budget',
  //   headerText: 'Budget',
  //   width: '100',
  //   format: 'yMd',
  //   textAlign: 'Center'
  // },

  // {
  //   field: 'Location',
  //   headerText: 'Location',
  //   width: '150',
  //   textAlign: 'Center'
  // },

  // {
  //   field: 'CustomerID',
  //   headerText: 'Customer ID',
  //   width: '120',
  //   textAlign: 'Center',
  //   isPrimaryKey: true
  // }
]

export const columnsComplaint = [
  {
    name: 'Nama',
    selector: (row) => row.nama
  },
  {
    name: 'Judul',
    selector: (row) => row.judul
  },
  {
    name: 'Isi',
    selector: (row) => row.isi
  }
]

export const columnsAdmin = [
  {
    name: 'Nama',
    selector: (row) => row.nama
  },
  {
    name: 'Email',
    selector: (row) => row.email
  }
]

export const columnsYellowCard = [
  {
    name: 'No',
    sortable: false,
    width: 'max-content',
    selector: (row, index) => index + 1
  },
  {
    name: 'Nama',
    sortable: true,
    selector: (row) => row.nama
  },
  {
    name: 'Tanggal',
    center: true,
    sortable: true,
    selector: (row) => row.createdAt
  }
]

export const customSort = (rows, selector, direction) => {
  return rows.sort((rowA, rowB) => {
    // use the selector function to resolve your field names by passing the sort comparitors
    const aField = selector(rowA)
    const bField = selector(rowB)

    let comparison = 0

    if (aField > bField) {
      comparison = 1
    } else if (aField < bField) {
      comparison = -1
    }

    return direction === 'desc' ? comparison * -1 : comparison
  })
}

export const dataTableStyles = {
  headCells: {
    style: {
      paddingInline: '1rem'
    }
  }
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'Belum diverifikasi':
      return 'bg-gray-600' // Abu-abu
    case 'Disetujui':
      return 'bg-green-600' // Hijau
    case 'Ditolak':
      return 'bg-red-600' // Merah
    default:
      return 'transparent'
  }
}

export const columnsParticipants = [
  {
    name: 'Nama',
    selector: (row) => row.User.nama
  },
  {
    name: 'Email',
    selector: (row) => row.User.email
  },
  {
    name: 'Pelatihan',
    selector: (row) => row.Jadwal.Pelatihan.nama
  }
]
