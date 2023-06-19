<template>
  <div>
    <b-card class="mt-3">
      <b-row>
        <b-col cols="3" xl="3" md="6" sm="12" class="mb-3 mb-md-0">
          <b-card title="Quantidade de eletrodomésticos por marca" class="p-3">
            <BarChart
              :data="chartData"
              :options="options_homeAppliance"
              v-if="!loading"
            />
            <div class="d-flex justify-content-center my-3" v-else>
              <b-spinner
                label="Spinning"
                style="width: 5rem; height: 5rem"
              ></b-spinner>
            </div>
            <b-table
              :fields="[
                { key: 'Marca' },
                { key: 'Quantidade', sortable: true },
              ]"
              :items="
                count_homeAppliance.brands.map((item) => {
                  return { Marca: item.brand, Quantidade: item.total };
                })
              "
              :busy="loading"
              :sort-by="'Quantidade'"
              :sort-desc="true"
              head-variant="dark"
              responsive
              bordered
              striped
              small
              outlined
              show-empty
            >
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Carregando...</strong>
                </div>
              </template>

              <template #empty="scope">
                <h6 class="text-center">Nenhum registro encontrado</h6>
              </template>
              <template #emptyfiltered="scope">
                <h6 class="text-center">Nenhum registro encontrado.</h6>
              </template>

              <template #cell(Quantidade)="row">
                <div class="text-center">
                  <b-badge variant="primary">{{
                    vueTools.toBrlNumber(row.value)
                  }}</b-badge>
                </div>
              </template>
            </b-table>
            <h5 class="text-center" v-if="!loading">
              Total: {{ vueTools.toBrlNumber(count_homeAppliance.all) }}
            </h5>
          </b-card>
        </b-col>

        <b-col cols="9" xl="9" md="6" sm="12">
          <b-card title="Listagem de eletrodomésticos">
            <b-row class="my-3">
              <b-col class="text-right">
                <b-button
                  @click="dialogNewHomeAppliance = true"
                  variant="primary"
                  :disabled="loading"
                  v-if="$auth.loggedIn"
                >
                  <b-icon icon="file-earmark-fill" aria-hidden="true"></b-icon>
                  Cadastrar novo eletrodoméstico</b-button
                >

                <b-button
                  @click="dialogSearchHomeAppliance = true"
                  variant="primary"
                  :disabled="loading"
                >
                  <b-icon icon="filter" aria-hidden="true"></b-icon>
                  Filtro</b-button
                >

                <b-modal
                  centered
                  title="Cadastrar eletrodoméstico"
                  v-model="dialogNewHomeAppliance"
                >
                  <b-form-group label="Nome" label-for="Nome">
                    <b-form-input
                      id="Nome"
                      v-model="form.name"
                      type="email"
                      placeholder="Digite o nome"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Voltagem" label-for="Voltagem">
                    <b-form-input
                      id="Voltagem"
                      v-model="form.voltage"
                      type="text"
                      placeholder="Digite a voltagem"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Marca" label-for="Marca">
                    <b-form-select
                      id="Marca"
                      v-model="form.brand"
                      :options="brands"
                      required
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group label="Descrição" label-for="Descrição">
                    <b-form-textarea
                      id="Descrição"
                      v-model="form.description"
                      type="text"
                      placeholder="Digite a descrição"
                      required
                    ></b-form-textarea>
                  </b-form-group>

                  <template v-slot:modal-footer="{ ok, cancel, hide }">
                    <b-button variant="danger" @click="cancel"
                      >Cancelar</b-button
                    >
                    <b-button variant="primary" @click="onSubmit"
                      ><b-spinner small type="grow" v-if="loading"></b-spinner>
                      Salvar</b-button
                    >
                  </template>
                </b-modal>

                <b-modal
                  centered
                  title="Filtro de eletrodomésticos"
                  v-model="dialogSearchHomeAppliance"
                >
                  <div class="row">
                    <div class="col">
                      <b-form-group label="Coluna">
                        <b-form-select
                          v-model="filter.column"
                          label="Coluna"
                          type="select"
                          :options="[
                            { text: 'ID', value: 'id' },
                            { text: 'Nome', value: 'name' },
                            { text: 'Marca', value: 'brand' },
                            { text: 'Voltagem', value: 'voltage' },
                          ]"
                        ></b-form-select>
                      </b-form-group>
                    </div>
                    <div class="col">
                      <b-form-group label="Operador">
                        <b-form-select
                          v-model="filter.operator"
                          label="Operador"
                          type="select"
                          :options="
                            filter.column !== 'brand'
                              ? [
                                  { text: 'Igual', value: '=' },
                                  { text: 'Contém', value: 'like' },
                                ]
                              : [{ text: 'Igual', value: '=' }]
                          "
                        ></b-form-select>
                      </b-form-group>
                    </div>
                    <div class="col">
                      <div v-if="filter.column !== 'brand'">
                        <div>
                          <div>
                            <b-form-group label="Valor">
                              <b-form-input
                                v-model="filter.value"
                                :disabled="false"
                                label="Valor"
                                type="text"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                      <div v-else>
                        <b-form-group label="Valor">
                          <b-form-select
                            v-model="filter.value"
                            label="Valor"
                            type="select"
                            :options="[
                              'Brastemp',
                              'Fischer',
                              'Electrolux',
                              'LG',
                              'Samsung',
                            ]"
                          ></b-form-select>
                        </b-form-group>
                      </div>
                    </div>
                  </div>

                  <template v-slot:modal-footer="{ ok, cancel, hide }">
                    <b-button variant="danger" @click="cancel"
                      >Cancelar</b-button
                    >
                    <b-button variant="primary" @click="applyFilter"><b-spinner small type="grow" v-if="loading"></b-spinner>
                      Aplicar filtro</b-button
                    >
                  </template>
                </b-modal>
              </b-col>
            </b-row>

            <b-row class="my-3" v-if="filterApplied">
              <b-col class="text-right">
                <h5 v-if="!loading">
                  Filtro aplicado: {{ appliedFilter.column }}
                  {{ appliedFilter.operator }} {{ appliedFilter.value }}
                  <b-button variant="danger" @click="removeFilter" size="sm" v-b-tooltip.hover title="Remover filtro">
                    <b-icon icon="x" aria-hidden="true"></b-icon>
                  </b-button>
                </h5>
                <b-row>
                  <b-col> </b-col>
                </b-row>
              </b-col>
            </b-row>

            <b-row>
              <b-col class="d-flex justify-content-end">
                <b-pagination
                  v-model="pagination.current"
                  :per-page="pagination.perPage"
                  :total-rows="pagination.rows"
                  :disabled="loading"
                  aria-controls="my-table"
                  first-number
                  last-number
                ></b-pagination>
              </b-col>
              <b-col class="text-right">
                <b-form-group
                  label="Exibir:"
                  label-for="table-select-mode-select"
                  label-cols-md="4"
                  class="float-right mt-2"
                  style="width: 200px"
                >
                  <b-form-select
                    id="table-select-mode-select"
                    v-model="pagination.perPage"
                    @change="get"
                    :options="['10', '25', '50', '100']"
                    class="mb-3"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-table
              :fields="table.fields"
              :items="table.items"
              :busy="loading"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              head-variant="dark"
              responsive
              bordered
              hover
              striped
              show-empty
              small
            >
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Carregando...</strong>
                </div>
              </template>

              <template #empty="scope">
                <h6 class="text-center">Nenhum registro encontrado</h6>
              </template>
              <template #emptyfiltered="scope">
                <h6 class="text-center">Nenhum registro encontrado.</h6>
              </template>

              <template #cell(voltage)="row"> {{ row.value }}V </template>

              <template #cell(action)="row" v-if="$auth.loggedIn">
                <b-button-group size="sm" class="d-flex justify-content-center">
                  <b-button
                    variant="success"
                    size="sm"
                    @click="edit(row.item, row.index, $event.target)"
                    v-b-tooltip.hover
                    title="Editar"
                  >
                    <b-icon-pencil font-scale="1"></b-icon-pencil>
                  </b-button>
                  <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteItem(row.item.id)"
                    v-b-tooltip.hover
                    title="Excluir"
                  >
                    <b-icon-trash font-scale="1"></b-icon-trash>
                  </b-button>
                </b-button-group>
              </template>
            </b-table>
            <b-row>
              <b-col class="d-flex justify-content-end">
                <b-pagination
                  v-model="pagination.current"
                  :per-page="pagination.perPage"
                  :total-rows="pagination.rows"
                  :disabled="loading"
                  aria-controls="my-table"
                  first-number
                  last-number
                ></b-pagination>
              </b-col>
              <b-col class="text-right">
                <b-form-group
                  label="Exibir:"
                  label-for="table-select-mode-select"
                  label-cols-md="4"
                  class="float-right mt-2"
                  style="width: 200px"
                >
                  <b-form-select
                    id="table-select-mode-select"
                    v-model="pagination.perPage"
                    @change="get"
                    :options="['10', '25', '50', '100']"
                    class="mb-3"
                    size="sm"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-modal
        :id="editModal.id"
        :title="`Editar eletrodoméstico: ${editModal.content.name}`"
        @hide="reseteditModal"
        centered
      >
        <b-form-group label="Nome" label-for="Nome">
          <b-form-input
            id="Nome"
            v-model="editForm.name"
            type="email"
            placeholder="Digite o nome"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Voltagem" label-for="Voltagem">
          <b-form-input
            id="Voltagem"
            v-model="editForm.voltage"
            type="text"
            placeholder="Digite a voltagem"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Marca" label-for="Marca">
          <b-form-select
            id="Marca"
            v-model="editForm.brand"
            :options="brands"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Descrição" label-for="Descrição">
          <b-textarea
            id="Descrição"
            v-model="editForm.description"
            type="text"
            placeholder="Digite a descrição"
            required
          ></b-textarea>
        </b-form-group>

        <template v-slot:modal-footer="{ ok, cancel, hide }">
          <b-button variant="danger" @click="cancel">Cancelar</b-button>
          <b-button
            variant="primary"
            @click="updateItem(editModal.content)"
            :loading="loading"
          >
            <b-spinner small v-if="loading"></b-spinner>

            Salvar</b-button
          >
        </template>
      </b-modal>
    </b-card>
  </div>
</template>

<script lang="ts">
import { HomeAppliance } from "~/models/HomeAppliance";
import { BrandQuantity } from "~/models/BrandQuantity";
import { HomeApplianceService } from "~/services/HomeApplianceService";
import VueTools from "~/helpers/mixins/vue-tools";
let VueToolsMixin = new VueTools();
import { mapState } from "vuex";

export default {
  //@ts-ignore
  auth: "guest",
  layout: "default",
  data() {
    return {
      loading: true,
      table: {
        fields: [
          { key: "id", label: "ID", sortable: true },
          { key: "name", label: "Nome", sortable: true },
          { key: "voltage", label: "Voltagem", sortable: true },
          { key: "brand", label: "Marca", sortable: true },
          { key: "description", label: "Descrição", sortable: false },
        ],
        items: [] as HomeAppliance[],
      },
      pagination: {
        current: 1,
        perPage: 10,
        rows: 0,
      },
      filter: {
        column: "",
        operator: "",
        value: "",
      },
      appliedFilter: {},
      filterApplied: false,
      sortBy: "",
      sortDesc: false,
      QueryURI: "",
      homeApplianceService: new HomeApplianceService(),
      form: {
        name: "",
        voltage: "",
        brand: "Electrolux",
        description: "",
      },
      editForm: {
        name: "",
        voltage: "",
        brand: "",
        description: "",
      },
      dialogNewHomeAppliance: false,
      dialogSearchHomeAppliance: false,
      editModal: {
        id: "info-modal",
        title: "",
        content: {} as HomeAppliance,
      },
      vueTools: VueToolsMixin,
      count_homeAppliance: {
        all: 0,
        brands: [] as BrandQuantity[],
      },
      options_homeAppliance: {
        responsive: true,
        animation: {
          duration: 0,
        },
        maintainAspectRatio: false,
        title: {
          display: true,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      this.table.fields.push({
        key: "action",
        label: "Ação",
        sortable: false,
      });
    }

    await this.$axios
      .get("/count-quantity-records")
      .then((response: any) => {
        this.count_homeAppliance = response.data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    await this.get();
  },
  methods: {
    async get() {
      this.loading = true;
      this.QueryURI = this.homeApplianceService.QueryURI.orderBy(
        this.sortBy,
        this.sortDesc ? "desc" : "asc"
      )
        .perPage(this.pagination.perPage)
        .page(this.pagination.current);

      if (this.filterApplied) {
        this.QueryURI.addSearchLike({
          colunm: this.appliedFilter.column,
          value: this.appliedFilter.value,
        });
      }
      try {
        const response = await this.homeApplianceService.list(
          this.QueryURI.get()
        );
        const { data, current_page, per_page, total } = response;

        this.table.items = data;
        this.pagination.current = current_page;
        this.pagination.perPage = per_page;
        this.pagination.rows = total;
        this.dialogSearchHomeAppliance = false;
      } catch (error) {
        this.vueTools.Toast.danger(
          "Erro",
          "Erro ao obter a lista de eletrodomésticos!"
        );
      } finally {
        await this.$axios
          .get("/count-quantity-records")
          .then((response: any) => {
            this.count_homeAppliance = response.data;
          })
          .catch((error: any) => {
            console.log(error);
          });
        this.loading = false;
      }
    },

    async onSubmit() {
      this.loading = true;
      let data = new FormData();
      data.append("name", this.form.name);
      data.append("voltage", this.form.voltage);
      data.append("brand", this.form.brand);
      data.append("description", this.form.description);

      try {
        const response = await this.homeApplianceService.create(data);
        this.dialogNewHomeAppliance = false;
        this.get();
        this.form.name = "";
        this.form.voltage = "";
        this.form.brand = "Electrolux";
        this.form.description = "";
        this.vueTools.Toast.success(
          "Sucesso",
          "Eletrodoméstico cadastrado com sucesso!"
        );
      } catch (error) {
        this.vueTools.Toast.danger(
          "Erro",
          "Erro ao cadastrar eletrodoméstico!"
        );
      } finally {
        this.loading = false;
      }
    },

    async edit(item: HomeAppliance, index: number, button: any) {
      this.editModal.title = `Row index: ${index}`;
      this.editModal.content = item;
      this.editForm.name = item.name;
      this.editForm.description = item.description;
      this.editForm.voltage = item.voltage;
      this.editForm.brand = item.brand;
      this.$root.$emit("bv::show::modal", this.editModal.id, button);
    },

    async reseteditModal() {
      this.editModal.title = "";
      this.editModal.content = "";
    },

    async updateItem(item: HomeAppliance): Promise<void> {
      this.loading = true;
      let data = new FormData();
      data.append("name", this.editForm.name);
      data.append("voltage", this.editForm.voltage);
      data.append("brand", this.editForm.brand);
      data.append("description", this.editForm.description);

      try {
        await this.homeApplianceService.update(item.id, "_method=PUT", data);
        this.loading = false;
        this.$root.$emit("bv::hide::modal", this.editModal.id);
        this.vueTools.Toast.success(
          "Sucesso",
          "Eletrodoméstico atualizado com sucesso!"
        );
        this.removeFilter();
        this.get();
      } catch (error) {
        this.vueTools.Toast.danger(
          "Erro",
          "Erro ao atualizar eletrodoméstico!"
        );
        this.loading = false;
      }
    },

    async deleteItem(id: string) {
      try {
        const confirmResult = await this.vueTools.ModalConfirm(
          "Remover eletrodoméstico",
          "Você tem certeza?"
        );
        if (confirmResult) {
          const response = await this.homeApplianceService.remove(
            id.toString()
          );
          await this.vueTools.ModalInfo("Sucesso", response.message);
          this.get();
        }
      } catch (error) {
        this.vueTools.Toast.danger("Erro", "Erro ao remover eletrodoméstico!");
      } finally {
      }
    },

    async applyFilter() {
      if (
        this.filter.column &&
        this.filter.operator &&
        this.filter.value !== ""
      ) {
        this.appliedFilter = {
          column: this.filter.column,
          operator: this.filter.operator,
          value: this.filter.value,
        };
        this.filterApplied = true;
        this.get();
      }
    },
    async removeFilter() {
      this.filterApplied = false;
      this.filter = {
        column: "",
        operator: "",
        value: "",
      };
      this.appliedFilter = {
        column: "",
        operator: "",
        value: "",
      };
      this.get();
    },
  },
  watch: {
    "pagination.current"(value: number) {
      this.get();
    },
    sortBy(value: string) {
      this.get();
    },
    sortDesc(value: boolean) {
      this.get();
    },
  },
  computed: {
    ...mapState("homeAppliance", ["brands"]),
    chartData() {
      return {
        labels: this.count_homeAppliance.brands.map((item: any) => item.brand),
        datasets: [
          {
            label: "Quantidade de eletrodomésticos por marca",
            backgroundColor: "#800080",
            data: this.count_homeAppliance.brands.map(
              (item: any) => item.total
            ),
          },
        ],
      };
    },
  },
};
</script>
