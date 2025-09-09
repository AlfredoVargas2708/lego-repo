import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LegoService } from '../lego.service';
import { Lego } from '../interfaces/lego';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DrawerModule } from 'primeng/drawer';
import { MessageModule } from 'primeng/message';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    AutoCompleteModule,
    DrawerModule,
    ReactiveFormsModule,
    MessageModule,
    IftaLabelModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  providers: [ConfirmationService, MessageService],
})
export class Layout implements OnInit {
  public first = 0;
  public limit = 6;
  public page = 1;
  public totalRecords = 0;
  public legoId: number = 0;
  public searchValue = '';
  public legos: Lego[] = [];
  public searchOptions: string[] | number[] = [];
  public searchOptionsByColumn: string[] | number[] = [];
  public loading = false;
  public columns: { label: string; value: string }[] = [];
  public selectedColumn: string = '';
  public drawerVisible = false;
  public isEdit = false;
  public autoFocus = false;
  public legoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    lego: new FormControl(null),
    pieza: new FormControl(null),
    cantidad: new FormControl(null),
    set: new FormControl(null),
    esta_pedido: new FormControl(''),
    esta_completo: new FormControl(''),
    esta_reemplazado: new FormControl(''),
  });
  
  constructor(
    private legoService: LegoService,
    private cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getColumns();
    this.loadLegos();
  }

  getColumns() {
    this.legoService.getColumns().subscribe((res) => {
      this.columns = Object.keys(res)
        .filter((key) => key !== 'id')
        .map((key) => ({ label: key.replace('_', ' '), value: key }));
    });
  }

  loadLegos() {
    this.loading = true;
    this.legoService.getLegos(this.page, this.limit).subscribe((res) => {
      this.legos = res.legos;
      this.legos.forEach((lego) => {
        lego.image_lego =
          res.images.legoImages.find((image) => image.lego === lego.lego)
            ?.image || '';
        lego.image_pieza =
          res.images.pieceImages.find((image) => image.piece === lego.pieza)
            ?.image || '';
      });
      this.totalRecords = res.count;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  pageChange(event: TableLazyLoadEvent) {
    this.first = event.first || 0;
    this.limit = event.rows || 6;
    this.page = Math.ceil(this.first / this.limit) + 1;
    this.loadLegos();
  }

  getSearchOptions(value: string) {
    this.legoService
      .getSearchOptions(this.selectedColumn, value)
      .subscribe((res) => {
        this.searchOptions = res;
      });
  }

  getSearchOptionsByColumn(column: string, value: string) {
    this.legoService.getSearchOptions(column, value).subscribe((res) => {
      this.searchOptionsByColumn = res;
    });
  }

  getLegosByFilter() {
    this.loading = true;
    this.legoService
      .getLegosByFilter(
        this.selectedColumn,
        this.searchValue,
        this.page,
        this.limit
      )
      .subscribe((res) => {
        this.legos = res.legos;
        this.legos.forEach((lego) => {
          lego.image_lego =
            res.images.legoImages.find((image) => image.lego === lego.lego)
              ?.image || '';
          lego.image_pieza =
            res.images.pieceImages.find((image) => image.piece === lego.pieza)
              ?.image || '';
        });
        this.totalRecords = res.count;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  onEditLego(lego: Lego) {
    this.isEdit = true;
    this.legoForm.patchValue(lego);
    this.drawerVisible = true;
  }

  onSubmit() {
    if (this.isEdit) {
      this.legoService
        .editLego(this.legoForm.value, this.legoForm.get('id')?.value)
        .subscribe((res) => {
          this.legos = this.legos.map((lego) =>
            lego.id === this.legoForm.get('id')?.value
              ? this.legoForm.value
              : lego
          );
          this.legos = this.legos.map((lego) => {
            return {
              ...lego,
              image_lego:
                res.images.legoImages.find((image) => image.lego === lego.lego)
                  ?.image || lego.image_lego,
              image_pieza:
                res.images.pieceImages.find(
                  (image) => image.piece === lego.pieza
                )?.image || lego.image_pieza,
            };
          });
          this.drawerVisible = false;
          this.legoForm.reset();
        });
    } else {
      this.legoService.addLego(this.legoForm.value).subscribe((res) => {
        this.selectedColumn =
          this.legoForm.get('lego')?.value !== null ? 'lego' : 'pieza';
        this.searchValue = this.legoForm.get(this.selectedColumn)?.value;
        this.getLegosByFilter();
        this.drawerVisible = false;
        this.legoForm.reset();
      });
    }
  }

  deleteLego(id: number) {
    this.legoService.deleteLego(id).subscribe((res) => {
      this.getLegosByFilter();
      this.cdr.markForCheck();
    });
  }

  confirm2(event: Event, id: number) {
    this.legoId = id;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Desea eliminar este registro?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },

      accept: () => {
        this.deleteLego(this.legoId);
        this.messageService.add({
          severity: 'info',
          summary: 'Eliminado',
          detail: 'Registro eliminado',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'Operación cancelada',
          life: 3000,
        });
      },
    });
  }
}
