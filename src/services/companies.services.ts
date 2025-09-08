import {NotFoundError} from "../errors/not-found.error.js";
import {Company} from "../models/company.model.js";
import {CompanyRepository} from "../repositories/company.repository.js";
import {UploadFileService} from "./upload-file.service.js";

export class CompaniesServices {
    private companyRepository: CompanyRepository
    private uploadFileService: UploadFileService;

    constructor() {
        this.companyRepository = new CompanyRepository()
        this.uploadFileService = new UploadFileService("images/companies/")
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll()
    }

    async getByID(id: string): Promise<Company> {
        const user = this.companyRepository.getByID(id)
        if (!user) {
            throw new NotFoundError("Empresa não encontrada")
        }
        // @ts-ignore
        return user
    }

    async save(company: Company) {
        company.logo = await this.uploadFileService.uploadFile(company.logo)
        await this.companyRepository.save(company)
    }

    async update(id: string, company: Company) {
        const companyResponse =  await this.companyRepository.getByID(id)
        if (!companyResponse){
            throw new NotFoundError("Empresa não encontrada")
        }
        companyResponse.logo = company.logo
        companyResponse.cpfCnpj = company.cpfCnpj
        companyResponse.razaoSocial = company.razaoSocial
        companyResponse.nomeFantasia = company.nomeFantasia
        companyResponse.telefone = company.telefone
        companyResponse.horarioFuncionamento = company.horarioFuncionamento
        companyResponse.endereco = company.endereco
        companyResponse.localizacao = company.localizacao
        companyResponse.taxaEntrega = company.taxaEntrega
        companyResponse.ativa = company.ativa
        await this.companyRepository.update(id, companyResponse)
    }
}