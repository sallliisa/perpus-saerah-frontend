import { softReload } from "@/stores/softreload"
import { toast } from "@/stores/toast"
import services from "@/utils/services"
import type { BaseCRUDConfig } from "@/types"

export function defaultOnDelete(endpoint: string, id: Object, key: string = 'm-table') {
    services
      .delete(endpoint, id)
      .then((res) => {
        toast().setSuccess('Data berhasil dihapus!')
        softReload().triggerChange(key)
      })
      .catch((err) => {
        toast().setError(err.data.message)
      })
  }

export const immutableDefaults: Partial<BaseCRUDConfig> = {
    actions: {
        create: true,
        update: true,
        delete: true,
        show: true
    },
    fieldsExclude: ['class_model_name', 'id', 'integration_id', 'updated_by', 'created_by', 'status_code', 'longitude', 'map_address', 'deleted', 'deleted_by', 'deleted_at', 'created_at'],
    fieldsAlias: {
        created_at: 'Dibuat',
        updated_at: 'Diubah',
        active: 'Status',
        code: 'Kode',
        name: 'Nama',
        description: 'Deskripsi',
        fullname: 'Nama',
        rel_created_by: 'Dibuat oleh',
        rel_updated_by: 'Diubah oleh',
        gender: "Jenis Kelamin",
        updated_by: "Diperbarui oleh",
        created_by: "Dibuat oleh",
        availability: "Ketersediaan",
        img_icon: "Icon",
        verified: "Status Verifikasi",
        start_date: "Tanggal Mulai",
        end_date: "Tanggal Selesai"
    },
    fieldsParse: {
        active: 'active',
        gender: 'gender',
        availability: 'availability',
        verified: 'verified'
    },
    fieldsType: {
        active: { type: 'chip', variants: { true: { color: 'success' }, false: { color: 'error' } } },
        created_at: { type: 'date', withTime: true },
        updated_at: { type: 'date', withTime: true },
    },
    inputConfig: {
        name: { type: 'text', props: {required: true} },
        code: { type: 'text', props: {required: true} },
        description: { type: 'textarea' },
        active: {
          type: 'radio',
          props: {
              items: [
                { id: true, name: 'Aktif' },
                { id: false, name: 'Tidak Aktif' },
              ],
              defaultToFirst: true,
          }
        },
        availability: {
          type: 'radio',
          props: {
              items: [
                { id: true, name: 'Available' },
                { id: false, name: 'Not Available' },
              ],
              defaultToFirst: true,
          }
        },
        nationality_type: {
        type: 'radio',
          props: {
              items: [
                { id: 'wni', name: 'WNI' },
                { id: 'wna', name: 'WNA' },
              ],
              initialBlank: false,
          }
        },
        gender: {
            type: 'radio',
            props: {
                items: [
                    { id: 'male', name: 'Laki-laki' },
                    { id: 'female', name: 'Perempuan' },
                ],
                initialBlank: false,
                required: true
            }
        },
        img_icon: {
          type: "image"
        },
        start_date: {
          type: "date",
          props: {
            required: true
          }
        },
        end_date: {
          type: "date",
          props: {
            required: true
          }
        }
    },
    fieldsFilterable: ['active']
}